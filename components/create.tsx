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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Textarea } from "@/components/ui/textarea"
import * as React from "react"
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
const values = [1, 2, 3, 4, 5];
import { useWizardContext } from '../wizardContext.js';
import { createClient } from '@supabase/supabase-js'
import { useQueryClient } from "react-query"
import { AnyMxRecord } from "dns"

const Priority = ({ values, selectedValue, onSelect }: {values: any, selectedValue: any, onSelect: any}) => {
    const [selectedButton, setSelectedButton] = useState(null);

    function choosePrio(value: any) {
        setSelectedButton(value);
        onSelect(value); // Call the onSelect function to handle the selected value
    }

    return (
        <div className="flex justify-center space-x-4 w-full">
        {values.map((value: any) => (
            <label key={value}>
            <Button
                variant="outline"
                onClick={() => choosePrio(value)}
                className={`${
                selectedButton === value ? "bg-gray-100 border-green-400" : ""
                }`} // Apply the gray background class conditionally
            >
                {value}
            </Button>
            </label>
        ))}
        </div>
    );
};

export default function Create({user}:{user: any}) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!  , process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const queryClient = useQueryClient();
    const { currentStep, chapter_critertia, previousStep, resetWizard, go_home } = useWizardContext();
    const [priority, setPriority] = useState(null);
    const [projectName, setProjectName] = useState(''); // State to store the project name
    const [chapterSelected, setChapterSelected] = useState('No chapter selected'); // State to store the project name
    const [taskName, setTaskName] = useState(''); // State to store the project name
    const [taskDesc, setTaskDesc] = useState(''); // State to store the project name
    const [projectDesc, setProjectDesc] = useState(''); // State to store the project name
    const [date, setDate] = React.useState<Date>()

    const handleNameChange = (e: any) => {
        setProjectName(e.target.value);
      };
    
      
    const handleDescriptionChange = (e: any) => {
    setProjectDesc(e.target.value);
    };

    const handleValueChange = (value: any) => {
        setPriority(value);
    };

    const handleTaskChange = (e: any) => {
        setTaskName(e.target.value);
    };

    const handleTaskDescChange = (e: any) => {
        setTaskDesc(e.target.value);
    };

    const handleChaptersChange = (e: any) => {
        setChapterSelected(e.target.value);
    };

    const assign_chapter = () => {
        setChapterSelected("Running")
        go_home()
    };


    async function create_item(){
        const currentDate = new Date();
        const { data, error } = await supabase
        .from('tasks')
        .insert([
        { name: taskName, chapter_id: 1, user_id: user.id, deadline: currentDate, priority: priority, description: taskDesc},
        ])
        .select()
        console.log(data)

        if(error){
            console.log(error)
        }

        queryClient.invalidateQueries("tasks");
    }
    
    async function create_project(){
        const currentDate = new Date();
        const { data, error } = await supabase
        .from('projects')
        .insert([
        { name: projectName, user_id: user.id, description: projectDesc },
        ])
        .select()
        console.log(data)

        if(error){
            console.log(error)
        }
        
        queryClient.invalidateQueries("projects");
    }
    async function create_chapter(){
        const currentDate = new Date();
        const { data, error } = await supabase
        .from('projects')
        .insert([
        { name: 'test', user_id: user.id, description: "Test" },
        ])
        .select()
        console.log(data)

        if(error){
            console.log(error)
        }
    }

    const renderStep = () => {
        switch (currentStep) {
        case "home":
            return (
                <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Create</Button>
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
                                <Button variant="outline"
                                    className={`wt-4 w-full h-20 ${chapterSelected !== 'No chapter selected' ? 'bg-gray-100 border-green-400' : ''}`}
                                    onClick={chapter_critertia}>{chapterSelected}</Button>

                                <Label className="wt-4">Name</Label>
                                <Input 
                                    id="name" 
                                    placeholder="Name of your task" 
                                    value={taskName}
                                    onChange={handleTaskChange}/>

                                <Label className="wt-4">Description</Label>
                                <Textarea 
                                value={taskDesc}
                                onChange={handleTaskDescChange}/>
                                
                                <Label className="wt-8">Priority</Label>
                                <Priority
                                    values={values}
                                    selectedValue={priority}
                                    onSelect={handleValueChange}
                                />

                                <Label className="wt-4">Deadline</Label>
                                <Input id="name" placeholder="Name of your task" />

                                <Button className="wt-4" type="submit" onClick={() => create_item()}>Create</Button>
                            </TabsContent>
                            <TabsContent value="chapter">
                                <Label className="wt-4">Project</Label>
                                <Button variant="outline" className="wt-4 w-full h-20">No project selected</Button>

                                <Label className="wt-4">Name</Label>
                                <Input id="name" placeholder="Name of your chapter" />

                                <Label className="wt-4">Description</Label>
                                <Textarea />

                                <Label className="wt-4">Acceptance criteria</Label>
                                <Button variant="outline" className="wt-4 w-full h-20 bg-red-50 hover:bg-red-50/50">
                                    No acceptance criteria defined
                                </Button>

                                <Button className="wt-4" type="submit" onClick={() => create_chapter()}>Create</Button>
                            </TabsContent>
                            <TabsContent value="project">
                                <Label className="wt-4">Name</Label>
                                <Input 
                                    id="name" 
                                    placeholder="Name of your project" 
                                    value={projectName}
                                    onChange={handleNameChange}/>

                                <Label className="wt-4">Description</Label>
                                <Textarea 
                                    id="description"
                                    placeholder="Description of your project"
                                    value={projectDesc}
                                    onChange={handleDescriptionChange}
                                />

                                <Label className="wt-4">Acceptance criteria</Label>
                                <Button variant="outline" className="wt-4 w-full h-20 bg-red-50 hover:bg-red-50/50">
                                    No acceptance criteria defined
                                </Button>

                                <Button className="wt-4" type="submit" onClick={() => create_project()}>Create</Button>
                            </TabsContent>
                        </Tabs>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
            );
        case "chapter_criteria":
            return (
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Create</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Choose chapter</DialogTitle>
                                <DialogDescription>
                                    Choose in which chapter this task belongs.
                                </DialogDescription>
                                    <Label className="wt-4">Project</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="running">Running</SelectItem>
                                            <SelectItem value="reading">Reading</SelectItem>
                                            <SelectItem value="work">Work</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Label className="wt-4">Chapter</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                            </DialogHeader>
                            <DialogFooter>
                            <Button type="submit" onClick={go_home}>Back</Button>
                            <Button type="submit" onClick={assign_chapter}>Assign</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        // Add cases for additional steps
        default:
            return null;
        }
    };


    
    return (
        <div>
            {renderStep()}
        </div>
        
    )
}
