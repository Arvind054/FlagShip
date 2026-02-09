"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  maskApiKey, formatDate, Project } from "@/lib/mock-data";
import { Copy, Eye, Settings, Plus, FolderOpen, Check, Loader2 } from "lucide-react";
import axios from 'axios';
import { useRouter } from "next/navigation";
export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const router = useRouter();
  const handleCopy = (apiKey: string, projectId: string) => {
    navigator.clipboard.writeText(apiKey);
    setCopiedId(projectId);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  async function getAllProjecs(){
    setLoading(true);
    try{
         const result = await axios.get("/api/projects");
         setProjects(result?.data);
    }catch(err){

    }finally{
       setLoading(false);
    }
  }
  useEffect(()=>{
     getAllProjecs();
  }, [])
  const handleCreateProject = async() => {
    if (!projectName) {
      return;
    }
    setLoading(true);
    try {
        const result = await axios.post('/api/projects', {name: projectName, description: projectDescription});
        setProjects((prev) => [...prev, result?.data]);
    } catch (err) {

    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

  if(loading){
    return (
       <div className="p-8 space-y-8  flex justify-center align-center">
             <Loader2 className="animate-spin"/>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your feature flag projects
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent className="border-border bg-card">
            <DialogHeader>
              <DialogTitle className="text-foreground">Create New Project</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Add a new project to organize your feature flags
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">Project Name</Label>
                <Input
                  id="name"
                  placeholder="My Project"
                  className="border-border bg-muted/50 text-foreground mt-1.5"
                  onChange={(e)=>setProjectName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-foreground">Description</Label>
                <Input
                  id="description"
                  placeholder="Project description"
                  className="border-border bg-muted/50 text-foreground mt-1.5"
                  onChange={(e)=>setProjectDescription(e.target.value)}
                />
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleCreateProject}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create Project"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Table */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Project Name</TableHead>
                <TableHead className="text-muted-foreground">API Key</TableHead>
                <TableHead className="text-muted-foreground">Created</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?.map((project) => (
                <TableRow key={project.id} className="border-b border-border/50 hover:bg-accent/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FolderOpen className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {project.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {project.description?.length > 50 ? project.description.substring(0,47)+ '...': project.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted px-3 py-1.5 rounded-lg text-foreground font-mono border border-border">
                        {maskApiKey(project.apiKey)}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                        onClick={() => handleCopy(project.apiKey, project.id)}
                      >
                        {copiedId === project.id ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(project.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                        onClick={()=>router.push(`/projects/${project?.id}`)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
