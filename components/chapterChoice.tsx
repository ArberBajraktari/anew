'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";


export default function ChapterChoice() {
    
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="wt-4 w-full h-20">No chapter selected</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create</DialogTitle>
                        <DialogDescription>
                            Create a task, chapter or project!
                        </DialogDescription>
                        <Tabs defaultValue="task" className="w-full">
                            <TabsList className="w-full">
                                <TabsTrigger value="task">Task</TabsTrigger>
                                <TabsTrigger value="chapter">Chapter</TabsTrigger>
                                <TabsTrigger value="project">Project</TabsTrigger>
                            </TabsList>
                            <TabsContent value="task">
                                <Label className="wt-4">Chapter</Label>
                                <Button variant="outline" className="wt-4 w-full h-20">No chapter selected</Button>
                                <Label className="wt-4">Name</Label>
                                <Input id="name" placeholder="Name of your task" />
                            </TabsContent>
                            <TabsContent value="chapter">
                                {/* Create task component*/}
                            </TabsContent>
                            <TabsContent value="project">
                                <Label className="wt-4">Name</Label>
                                <Input id="name" placeholder="Name of your task" />

                                <Label className="wt-4">Description</Label>
                                <Textarea />
                            </TabsContent>
                        </Tabs>
                    </DialogHeader>
                    <DialogFooter>
                    <Button type="submit">Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
