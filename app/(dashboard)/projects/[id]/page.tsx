"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Project, FeatureFlag, formatDate, formatDateTime, maskApiKey } from '@/lib/mock-data';
import axios from 'axios';
import { Loader2, ArrowLeft, Copy, Check, Flag, Edit2, Settings, Key, Calendar, FileText, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = params.id as string;
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [features, setFeatures] = useState<FeatureFlag[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedKey, setCopiedKey] = useState(false);
    
    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [keyManuallyEdited, setKeyManuallyEdited] = useState(false);
    const [newFeature, setNewFeature] = useState({
      name: '',
      key: '',
      description: '',
      type: 'release'
    });

    // Delete dialog state
    const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] = useState(false);
    const [deleteFlagDialogOpen, setDeleteFlagDialogOpen] = useState(false);
    const [flagToDelete, setFlagToDelete] = useState<FeatureFlag | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
      if (!projectId) {
        router.push("/projects");
        return;
      }
      getProjectData();
    }, [projectId]);

    async function getProjectData() {
      setLoading(true);
      try {
        const [projectResult, featuresResult] = await Promise.all([
          axios.get(`/api/projects?id=${projectId}`),
          axios.get(`/api/features?projectId=${projectId}`)
        ]);
        setProject(projectResult?.data);
        setFeatures(featuresResult?.data || []);
      } catch (err) {
        console.log("Error fetching Project", err);
      } finally {
        setLoading(false);
      }
    }

    const handleCopyApiKey = async () => {
      if (project?.apiKey) {
        await navigator.clipboard.writeText(project.apiKey);
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
      }
    };

    const handleCreateFeature = async () => {
      if (!newFeature.name || !newFeature.key) return;
      
      setCreating(true);
      try {
        await axios.post('/api/features', {
          projectId,
          key: newFeature.key,
          name: newFeature.name,
          description: newFeature.description,
          type: newFeature.type
        });
        setDialogOpen(false);
        setNewFeature({ name: '', key: '', description: '', type: 'release' });
        setKeyManuallyEdited(false);
        getProjectData();
      } catch (err) {
        console.error('Error creating feature:', err);
      } finally {
        setCreating(false);
      }
    };

    const generateKeyFromName = (name: string) => {
      return name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    };

    const handleDeleteFlag = async () => {
      if (!flagToDelete) return;
      
      setDeleting(true);
      try {
        await axios.delete(`/api/features/${flagToDelete.id}`);
        setDeleteFlagDialogOpen(false);
        setFlagToDelete(null);
        getProjectData();
      } catch (err) {
        console.error('Error deleting flag:', err);
      } finally {
        setDeleting(false);
      }
    };

    const handleDeleteProject = async () => {
      setDeleting(true);
      try {
        await axios.delete(`/api/projects/${projectId}`);
        router.push('/projects');
      } catch (err) {
        console.error('Error deleting project:', err);
      } finally {
        setDeleting(false);
      }
    };

    const openDeleteFlagDialog = (flag: FeatureFlag) => {
      setFlagToDelete(flag);
      setDeleteFlagDialogOpen(true);
    };

    if (loading) {
      return (
        <div className="p-8 flex items-center justify-center min-h-100">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
    }

    if (!project) {
      return (
        <div className="p-8 space-y-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Project not found</p>
            <Button variant="outline" className="mt-4" onClick={() => router.push("/projects")}>
              Back to Projects
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="p-8 space-y-8">
        {/* Back button and header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/projects")}
            className="h-10 w-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
            <p className="text-muted-foreground mt-1">{project.description}</p>
          </div>
          <Dialog open={deleteProjectDialogOpen} onOpenChange={setDeleteProjectDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  Delete Project
                </DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete <strong>{project.name}</strong>? This action cannot be undone. All feature flags ({features.length}) associated with this project will also be deleted.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteProjectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteProject} disabled={deleting}>
                  {deleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete Project'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Project Details Card */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Project Details
            </CardTitle>
            <CardDescription>Overview and configuration for this project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* API Key */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Key className="w-4 h-4" />
                  API Key
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {maskApiKey(project.apiKey)}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleCopyApiKey}
                  >
                    {copiedKey ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Created Date */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Created
                </div>
                <p className="text-sm font-medium">{formatDate(project.createdAt)}</p>
              </div>

              {/* Project ID */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  Project ID
                </div>
                <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  {project.id}
                </code>
              </div>

              {/* Feature Count */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Flag className="w-4 h-4" />
                  Feature Flags
                </div>
                <p className="text-sm font-medium">{features.length} flags</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Flags Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Feature Flags</h2>
              <p className="text-muted-foreground text-sm">Manage feature flags for this project</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Flag
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-125">
                <DialogHeader>
                  <DialogTitle>Create New Feature Flag</DialogTitle>
                  <DialogDescription>
                    Add a new feature flag to control feature rollout in your application.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Dark Mode"
                      value={newFeature.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setNewFeature(prev => ({
                          ...prev,
                          name,
                          key: keyManuallyEdited ? prev.key : generateKeyFromName(name)
                        }));
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="key">Key</Label>
                    <Input
                      id="key"
                      placeholder="e.g., dark_mode"
                      value={newFeature.key}
                      onChange={(e) => {
                        setKeyManuallyEdited(true);
                        setNewFeature(prev => ({ ...prev, key: e.target.value }));
                      }}
                    />
                    <p className="text-xs text-muted-foreground">
                      This is the unique identifier used in your code to reference this flag.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="What does this feature flag control?"
                      value={newFeature.description}
                      onChange={(e) => setNewFeature(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newFeature.type}
                      onValueChange={(value) => setNewFeature(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="release">Release</SelectItem>
                        <SelectItem value="experiment">Experiment</SelectItem>
                        <SelectItem value="operational">Operational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateFeature} 
                    disabled={creating || !newFeature.name || !newFeature.key}
                  >
                    {creating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Flag'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {features.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((flag) => (
                <Card key={flag.id} className="border-border bg-card hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Flag className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{flag.name}</h3>
                          <code className="text-xs text-muted-foreground font-mono">{flag.key}</code>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => openDeleteFlagDialog(flag)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {flag.description || 'No description'}
                    </p>

                    {/* Flag ID */}
                    <div className="mb-3">
                      <span className="text-xs text-muted-foreground">Flag ID: </span>
                      <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">{flag.id}</code>
                    </div>

                    <div className="space-y-3">
                      {/* Type Badge */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Type:</span>
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

                      {/* Environments with Status */}
                      <div className="space-y-2">
                        <span className="text-xs text-muted-foreground">Environments:</span>
                        <div className="space-y-1">
                          {flag.environments.map((env) => (
                            <div key={env.id} className="flex items-center justify-between text-xs">
                              <Badge
                                variant="outline"
                                className={
                                  env.environment === "dev"
                                    ? "bg-muted text-muted-foreground border-border"
                                    : env.environment === "staging"
                                    ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
                                    : "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                                }
                              >
                                {env.environment}
                              </Badge>
                              <div className="flex items-center gap-2">
                                <span className={env.status ? "text-green-600" : "text-muted-foreground"}>
                                  {env.status ? "ON" : "OFF"}
                                </span>
                                <span className="text-muted-foreground">
                                  {env.rolloutPercentage ?? 0}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Overall Rollout Progress */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Overall Progress</span>
                          <span className="text-sm font-medium">
                            {Math.round(flag.environments.reduce((acc, env) => acc + (env.rolloutPercentage ?? 0), 0) / (flag.environments.length || 1))}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-primary to-blue-400 transition-all"
                            style={{ width: `${Math.round(flag.environments.reduce((acc, env) => acc + (env.rolloutPercentage ?? 0), 0) / (flag.environments.length || 1))}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        Created {formatDateTime(flag.createdAt)}
                      </span>
                      <Link href={`/flags/${flag.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 text-muted-foreground hover:text-primary"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border bg-card">
              <CardContent className="py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 rounded-full bg-muted">
                    <Flag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No feature flags yet</p>
                  <p className="text-sm text-muted-foreground">Create your first feature flag to get started</p>
                  <Button className="mt-2" onClick={() => setDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Flag
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Delete Flag Confirmation Dialog */}
        <Dialog open={deleteFlagDialogOpen} onOpenChange={setDeleteFlagDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Delete Feature Flag
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <strong>{flagToDelete?.name}</strong>? This action cannot be undone. All environment configurations for this flag will also be deleted.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-muted/50 rounded-lg p-3 space-y-2 text-sm">
                <div><span className="text-muted-foreground">Flag Key:</span> <code className="font-mono">{flagToDelete?.key}</code></div>
                <div><span className="text-muted-foreground">Flag ID:</span> <code className="font-mono text-xs">{flagToDelete?.id}</code></div>
                <div><span className="text-muted-foreground">Type:</span> {flagToDelete?.type}</div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteFlagDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteFlag} disabled={deleting}>
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Flag'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
}