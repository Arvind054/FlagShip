"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatDateTime, formatDate, FeatureFlag, FeatureRule } from "@/lib/mock-data";
import { ChevronLeft, MoreVertical, Flag, Info, Target, Layers, History, Loader2, Check, Plus, Trash2, RotateCcw, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

type PageProps = {
  params: {
    id: string;
  };
};

export default function FlagDetailsPage() {
    const params = useParams();
    const flagId = params.id as string;
    const router  = useRouter();
    const [flag, setFlag] = useState<FeatureFlag | null>(null)
    const [loading, setLoading] =  useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [rolloutValues, setRolloutValues] = useState({
        dev: 0,
        staging: 0,
        prod: 0
    });

    const [statusValues, setStatusValues] = useState({
        dev: false,
        staging: false,
        prod: false
    });

    // Original values to track changes
    const [originalRolloutValues, setOriginalRolloutValues] = useState({
        dev: 0,
        staging: 0,
        prod: 0
    });

    const [originalStatusValues, setOriginalStatusValues] = useState({
        dev: false,
        staging: false,
        prod: false
    });

    const [saving, setSaving] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

    // Check if environment has unsaved changes
    const hasChanges = useCallback((env: 'dev' | 'staging' | 'prod') => {
        return rolloutValues[env] !== originalRolloutValues[env] || 
               statusValues[env] !== originalStatusValues[env];
    }, [rolloutValues, statusValues, originalRolloutValues, originalStatusValues]);

    // Save changes for a specific environment
    const saveEnvironmentChanges = useCallback(async (env: 'dev' | 'staging' | 'prod') => {
        if (!flagId) return;
        
        setSaving(env);
        try {
            await axios.patch(`/api/features/${flagId}`, {
                environment: env,
                status: statusValues[env],
                rolloutPercentage: rolloutValues[env]
            });
            
            // Update original values to current values after successful save
            setOriginalRolloutValues(prev => ({ ...prev, [env]: rolloutValues[env] }));
            setOriginalStatusValues(prev => ({ ...prev, [env]: statusValues[env] }));
            
            // Refresh audit logs
            const result = await axios.get(`/api/features/${flagId}`);
            setAuditLogs(result.data.auditLogs || []);
            
            setSaveSuccess(env);
            setTimeout(() => setSaveSuccess(null), 2000);
        } catch (err) {
            console.error(`Error updating ${env}:`, err);
        } finally {
            setSaving(null);
        }
    }, [flagId, statusValues, rolloutValues]);

    // Rollout change handler (no auto-save)
    const handleRolloutChange = useCallback((env: 'dev' | 'staging' | 'prod', value: number) => {
        setRolloutValues(prev => ({ ...prev, [env]: value }));
    }, []);

    // Status toggle handler (no auto-save)
    const handleStatusChange = useCallback((env: 'dev' | 'staging' | 'prod', checked: boolean) => {
        setStatusValues(prev => ({ ...prev, [env]: checked }));
    }, []);

    // Audit logs type and state
    type AuditLog = {
        id: string;
        projectId: string;
        featureId: string;
        action_type: string;
        oldConfig: any;
        newConfig: any;
        updatedBy: string;
        createdAt: string;
        userName: string | null;
        userEmail: string | null;
    };
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
    const [rollingBack, setRollingBack] = useState<string | null>(null);

    // Rollback to previous config
    const handleRollback = async (log: AuditLog) => {
        if (!log.oldConfig || !flagId) return;
        
        setRollingBack(log.id);
        try {
            // Apply the old config to all environments
            const oldConfig = log.oldConfig as any;
            
            if (oldConfig.environment) {
                // Single environment rollback
                await axios.patch(`/api/features/${flagId}`, {
                    environment: oldConfig.environment,
                    status: oldConfig.status,
                    rolloutPercentage: oldConfig.rolloutPercentage,
                    rules: oldConfig.rules
                });
            } else if (oldConfig.rules !== undefined) {
                // Rules rollback - apply to all environments
                await Promise.all(['dev', 'staging', 'prod'].map(env =>
                    axios.patch(`/api/features/${flagId}`, {
                        environment: env,
                        rules: oldConfig.rules
                    })
                ));
                setRules(oldConfig.rules || []);
            }
            
            // Refresh flag data
            const result = await axios.get(`/api/features/${flagId}`);
            const flagData = result.data;
            setFlag(flagData);
            setAuditLogs(flagData.auditLogs || []);
            
            // Update state from refreshed data
            if (flagData.environments) {
                const getRollout = (env: string) => {
                    const envData = flagData.environments.find((e: any) => e.environment === env);
                    return envData?.rolloutPercentage ?? 0;
                };
                const getStatus = (env: string) => {
                    const envData = flagData.environments.find((e: any) => e.environment === env);
                    return envData?.status ?? false;
                };
                setRolloutValues({
                    dev: getRollout('dev'),
                    staging: getRollout('staging'),
                    prod: getRollout('prod')
                });
                setStatusValues({
                    dev: getStatus('dev'),
                    staging: getStatus('staging'),
                    prod: getStatus('prod')
                });
                // Also update original values after rollback
                setOriginalRolloutValues({
                    dev: getRollout('dev'),
                    staging: getRollout('staging'),
                    prod: getRollout('prod')
                });
                setOriginalStatusValues({
                    dev: getStatus('dev'),
                    staging: getStatus('staging'),
                    prod: getStatus('prod')
                });
            }
        } catch (err) {
            console.error('Error rolling back:', err);
        } finally {
            setRollingBack(null);
        }
    };

    // Targeting rules state
    const [rules, setRules] = useState<FeatureRule[]>([]);
    const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
    const [savingRules, setSavingRules] = useState(false);
    const [newRule, setNewRule] = useState<FeatureRule>({
        field: '',
        operator: 'equals',
        value: ''
    });

    // Add a new rule
    const handleAddRule = () => {
        if (!newRule.field || newRule.value === '') return;
        const updatedRules = [...rules, newRule];
        setRules(updatedRules);
        setNewRule({ field: '', operator: 'equals', value: '' });
        setRuleDialogOpen(false);
    };

    // Remove a rule
    const handleRemoveRule = (index: number) => {
        const updatedRules = rules.filter((_, i) => i !== index);
        setRules(updatedRules);
    };

    // Save rules to all environments
    const handleSaveRules = async () => {
        if (!flagId) return;
        setSavingRules(true);
        try {
            // Save rules to all environments
            await Promise.all(['dev', 'staging', 'prod'].map(env =>
                axios.patch(`/api/features/${flagId}`, {
                    environment: env,
                    rules: rules
                })
            ));
        } catch (err) {
            console.error('Error saving rules:', err);
        } finally {
            setSavingRules(false);
        }
    };

    useEffect(()=>{
        if(!flagId){
            router.push("/projects");
            return;
        }
         const getFlagData = async()=>{
          setLoading(true);
             try{
                const result = await axios.get(`/api/features/${flagId}`);
                const flagData = result.data;
                setFlag(flagData);
                
                // Set rollout values from environments
                if (flagData.environments) {
                    const getRollout = (env: string) => {
                        const envData = flagData.environments.find((e: any) => e.environment === env);
                        return envData?.rolloutPercentage ?? 0;
                    };
                    const getStatus = (env: string) => {
                        const envData = flagData.environments.find((e: any) => e.environment === env);
                        return envData?.status ?? false;
                    };
                    setRolloutValues({
                        dev: getRollout('dev'),
                        staging: getRollout('staging'),
                        prod: getRollout('prod')
                    });
                    setStatusValues({
                        dev: getStatus('dev'),
                        staging: getStatus('staging'),
                        prod: getStatus('prod')
                    });
                    
                    // Set original values for change tracking
                    setOriginalRolloutValues({
                        dev: getRollout('dev'),
                        staging: getRollout('staging'),
                        prod: getRollout('prod')
                    });
                    setOriginalStatusValues({
                        dev: getStatus('dev'),
                        staging: getStatus('staging'),
                        prod: getStatus('prod')
                    });
                    
                    // Load rules from first environment that has them
                    const envWithRules = flagData.environments.find((e: any) => e.rules && e.rules.length > 0);
                    if (envWithRules?.rules) {
                        setRules(envWithRules.rules);
                    }
                }
                
                // Set audit logs from API response
                if (flagData.auditLogs) {
                    setAuditLogs(flagData.auditLogs);
                }
             }catch(err: any){
               console.log("Error fetching flag:", err);
               setError(err.response?.data?.error || err.message || "Failed to fetch feature");
             }finally{
               setLoading(false);
             }
         }
         getFlagData();
    }, [flagId]);

    if (loading) {
        return (
          <div className="p-8 flex items-center justify-center min-h-100">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        );
    }

    if (!flag) {
        return (
          <div className="p-8 space-y-8">
            <div className="text-center py-12">
              <p className="text-muted-foreground">{error || "Feature flag not found"}</p>
              <Button variant="outline" className="mt-4" onClick={() => router.push("/flags")}>
                Back to Flags
              </Button>
            </div>
          </div>
        );
    }
  

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/flags">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-accent">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-linear-to-br from-primary to-blue-400 shadow-lg shadow-primary/25">
              <Flag className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-foreground">{flag.name}</h1>
                <Badge
                  variant="outline"
                  className={
                    flag.type === "release"
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                      : flag.type === "experiment"
                      ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                      : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
                  }
                >
                  {flag.type}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1 font-mono text-sm">
                {flag.key}
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="border-b border-border bg-transparent p-0 h-auto">
          <TabsTrigger
            value="overview"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none px-4 py-2"
          >
            <Info className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="targeting"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none px-4 py-2"
          >
            <Target className="w-4 h-4 mr-2" />
            Targeting Rules
          </TabsTrigger>
          <TabsTrigger
            value="environments"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none px-4 py-2"
          >
            <Layers className="w-4 h-4 mr-2" />
            Environments
          </TabsTrigger>
          <TabsTrigger
            value="audit"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none px-4 py-2"
          >
            <History className="w-4 h-4 mr-2" />
            Audit Logs
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Name
                  </Label>
                  <p className="text-foreground mt-1">{flag.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Key
                  </Label>
                  <p className="text-foreground font-mono mt-1 bg-muted px-2 py-1 rounded inline-block">{flag.key}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Type
                  </Label>
                  <div className="mt-1">
                    <Badge
                      variant="outline"
                      className={
                        flag.type === "release"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                          : flag.type === "experiment"
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                          : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
                      }
                    >
                      {flag.type}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Created
                  </Label>
                  <p className="text-foreground mt-1">
                    {formatDate(flag.createdAt)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </Label>
                  <p className="text-foreground mt-1">
                    {formatDateTime(flag.createdAt)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Description
                  </Label>
                  <p className="text-foreground mt-1">{flag.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Targeting Rules Tab */}
        <TabsContent value="targeting" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-foreground">Targeting Rules</CardTitle>
                <div className="flex items-center gap-2">
                  {rules.length > 0 && (
                    <Button 
                      onClick={handleSaveRules}
                      disabled={savingRules}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {savingRules ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Rules'
                      )}
                    </Button>
                  )}
                  <Dialog open={ruleDialogOpen} onOpenChange={setRuleDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Rule
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Targeting Rule</DialogTitle>
                        <DialogDescription>
                          Create a rule to target specific users based on attributes.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="field">Field</Label>
                          <Input
                            id="field"
                            placeholder="e.g., userId, country, plan"
                            value={newRule.field}
                            onChange={(e) => setNewRule(prev => ({ ...prev, field: e.target.value }))}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="operator">Operator</Label>
                          <Select
                            value={newRule.operator}
                            onValueChange={(value) => setNewRule(prev => ({ ...prev, operator: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select operator" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="not_equals">Not Equals</SelectItem>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="not_contains">Not Contains</SelectItem>
                              <SelectItem value="starts_with">Starts With</SelectItem>
                              <SelectItem value="ends_with">Ends With</SelectItem>
                              <SelectItem value="greater_than">Greater Than</SelectItem>
                              <SelectItem value="less_than">Less Than</SelectItem>
                              <SelectItem value="in">In List</SelectItem>
                              <SelectItem value="not_in">Not In List</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="value">Value</Label>
                          <Input
                            id="value"
                            placeholder="e.g., premium, US, user123"
                            value={newRule.value}
                            onChange={(e) => setNewRule(prev => ({ ...prev, value: e.target.value }))}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setRuleDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleAddRule}
                          disabled={!newRule.field || newRule.value === ''}
                        >
                          Add Rule
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {rules.length === 0 ? (
                <div className="text-center py-12">
                  <div className="p-4 rounded-full bg-muted inline-block mb-4">
                    <Target className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-2">No rules configured yet</p>
                  <p className="text-sm text-muted-foreground">Add targeting rules to control which users see this feature.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {rules.map((rule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {rule.field}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{rule.operator.replace('_', ' ')}</span>
                        <Badge variant="outline" className="bg-muted text-foreground border-border">
                          {String(rule.value)}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveRule(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Environments Tab */}
        <TabsContent value="environments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dev Environment */}
            <Card className="border-border bg-card overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-br from-slate-500/5 to-slate-600/5 opacity-50" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Development</CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-muted text-muted-foreground border-border"
                  >
                    dev
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 relative">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-muted-foreground">Status</Label>
                    <div className="flex items-center gap-2">
                      {saving === 'dev' && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                      {saveSuccess === 'dev' && <Check className="w-4 h-4 text-green-500" />}
                      <Switch 
                        checked={statusValues.dev} 
                        onCheckedChange={(checked) => handleStatusChange('dev', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-muted-foreground">
                      Rollout
                    </Label>
                    <span className="text-sm font-bold text-primary">
                      {rolloutValues.dev}%
                    </span>
                  </div>
                  <Slider
                    value={[rolloutValues.dev]}
                    onValueChange={(val) => handleRolloutChange('dev', val[0])}
                    max={100}
                    step={10}
                    className="cursor-pointer"
                  />
                </div>

                {hasChanges('dev') && (
                  <Button
                    onClick={() => saveEnvironmentChanges('dev')}
                    disabled={saving === 'dev'}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {saving === 'dev' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Staging Environment */}
            <Card className="border-border bg-card overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-br from-yellow-500/5 to-amber-500/5 opacity-50" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Staging</CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
                  >
                    staging
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 relative">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-muted-foreground">Status</Label>
                    <div className="flex items-center gap-2">
                      {saving === 'staging' && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                      {saveSuccess === 'staging' && <Check className="w-4 h-4 text-green-500" />}
                      <Switch 
                        checked={statusValues.staging} 
                        onCheckedChange={(checked) => handleStatusChange('staging', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-muted-foreground">
                      Rollout
                    </Label>
                    <span className="text-sm font-bold text-primary">
                      {rolloutValues.staging}%
                    </span>
                  </div>
                  <Slider
                    value={[rolloutValues.staging]}
                    onValueChange={(val) => handleRolloutChange('staging', val[0])}
                    max={100}
                    step={10}
                    className="cursor-pointer"
                  />
                </div>

                {hasChanges('staging') && (
                  <Button
                    onClick={() => saveEnvironmentChanges('staging')}
                    disabled={saving === 'staging'}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {saving === 'staging' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Production Environment */}
            <Card className="border-border bg-card overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-emerald-500/5 opacity-50" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Production</CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                  >
                    prod
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 relative">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-muted-foreground">Status</Label>
                    <div className="flex items-center gap-2">
                      {saving === 'prod' && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                      {saveSuccess === 'prod' && <Check className="w-4 h-4 text-green-500" />}
                      <Switch 
                        checked={statusValues.prod} 
                        onCheckedChange={(checked) => handleStatusChange('prod', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-muted-foreground">
                      Rollout
                    </Label>
                    <span className="text-sm font-bold text-primary">
                      {rolloutValues.prod}%
                    </span>
                  </div>
                  <Slider
                    value={[rolloutValues.prod]}
                    onValueChange={(val) => handleRolloutChange('prod', val[0])}
                    max={100}
                    step={10}
                    className="cursor-pointer"
                  />
                </div>

                {hasChanges('prod') && (
                  <Button
                    onClick={() => saveEnvironmentChanges('prod')}
                    disabled={saving === 'prod'}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {saving === 'prod' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audit Logs Tab */}
        <TabsContent value="audit" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No audit logs yet</p>
                ) : (
                  auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border"
                    >
                      <div className="p-2 rounded-full bg-primary/10">
                        <History className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">{log.action_type}</p>
                          {log.oldConfig && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRollback(log)}
                              disabled={rollingBack === log.id}
                              className="text-xs"
                            >
                              {rollingBack === log.id ? (
                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                              ) : (
                                <RotateCcw className="w-3 h-3 mr-1" />
                              )}
                              Rollback
                            </Button>
                          )}
                        </div>
                        
                        {/* Config changes */}
                        <div className="mt-3 space-y-2">
                          {log.oldConfig && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Previous: </span>
                              <code className="bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-1 rounded text-xs">
                                {typeof log.oldConfig === 'object' 
                                  ? JSON.stringify(log.oldConfig, null, 2) 
                                  : String(log.oldConfig)}
                              </code>
                            </div>
                          )}
                          {log.newConfig && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">New: </span>
                              <code className="bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded text-xs">
                                {typeof log.newConfig === 'object' 
                                  ? JSON.stringify(log.newConfig, null, 2) 
                                  : String(log.newConfig)}
                              </code>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                          <span className="font-medium">{log.userName || log.userEmail || log.updatedBy}</span>
                          <span>•</span>
                          <span>{formatDateTime(new Date(log.createdAt))}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}