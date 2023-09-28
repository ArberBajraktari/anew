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
import { Checkbox } from "@/components/ui/checkbox"
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
const values = [1, 2, 3, 4, 5];
import { useWizardContext } from '../wizardContext.js';
import { createClient } from '@supabase/supabase-js'
import { useQuery, useQueryClient } from "react-query"
import AcceptanceCriteria from "./ac"

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

interface AcceptanceCriteria{
    id: number;
    name: string;
}

export default function Create({user}:{user: any}) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!  , process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const queryClient = useQueryClient();
    const { currentStep, select_chapter, select_project, go_home_chapter, resetWizard, go_home, select_order, go_ac_project, go_home_project } = useWizardContext();
    const [priority, setPriority] = useState(null);
    const [projectName, setProjectName] = useState(''); // State to store the project name
    const [chapterSelected, setChapterSelected] = useState('No chapter selected'); // State to store the project name
    const [projectSelected, setProjectSelected] = useState('No project selected'); // State to store the project name
    const [projectSelectedTemp, setProjectSelectedTemp] = useState('No project selected'); // State to store the project name
    const [taskName, setTaskName] = useState(''); // State to store the project name
    const [taskDesc, setTaskDesc] = useState(''); // State to store the project name
    const [projectDesc, setProjectDesc] = useState(''); // State to store the project name
    
    const [projectAC, setProjectAC] = useState<AcceptanceCriteria[]>([]);
    const [date, setDate] = React.useState<Date>()

    const {
        isLoading: isLoadingProjects,
        error: errorProjects,
        data: dataProjects,
      } = useQuery("projects", async () => {
        // Your data fetching logic goes here, e.g., fetch data from Supabase
        const { data, error } = await supabase.from('projects').select("*").eq('user_id', user.id);
        if (error) {
          throw new Error(error.message);
        }
        return data;
      });

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

    const handleProjectSelection = (e: any) => {
        setProjectSelectedTemp(e);
    };

    const assign_chapter = () => {
        setChapterSelected("Running")
        go_home()
    };

    const assign_project = () => {
        if(projectSelectedTemp !== "No project selected"){
            setProjectSelected(projectSelectedTemp)
            setProjectSelectedTemp("No project selected")
        }
        go_home_chapter()
    };

    const handleDeleteLabel = (idToDelete: number) => {
        setProjectAC((prevAC) => prevAC.filter((ac) => ac.id !== idToDelete))
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

    async function add_ac_project(){
            // Define the new label data
        const temp: AcceptanceCriteria = { id: projectAC.length + 1, name: "helo" };
        setProjectAC((prevProjectAC) => [...prevProjectAC, temp]);
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
                                            onClick={select_chapter}>{chapterSelected}</Button>

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
                                        <Button variant="outline"
                                        className={`wt-4 w-full h-20 ${projectSelected !== 'No project selected' ? 'bg-gray-100 border-green-400' : ''}`}
                                        onClick={select_project}>{projectSelected}</Button>

                                        <Label className="wt-4">Name</Label>
                                        <Input id="name" placeholder="Name of your chapter" />

                                        <Label className="wt-4">Description</Label>
                                        <Textarea />

                                        <Label className="wt-4">Acceptance criteria</Label>
                                        <Button variant="outline" className="wt-4 w-full h-20 bg-red-50 hover:bg-red-50/50">
                                            No acceptance criteria defined
                                        </Button>

                                        <Label className="wt-4">Chapter order</Label>
                                        <Button variant="outline" className="wt-4 w-full h-20 bg-blue-50 hover:bg-blue-50/50"
                                            onClick={select_order}>
                                            Chapter order
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
                                        <Button 
                                            variant="outline" 
                                            className="wt-4 w-full h-20 bg-red-50 hover:bg-red-50/50"
                                            onClick={go_ac_project}>
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
        case "home_chapter":
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
                            <Tabs defaultValue="chapter" className="w-full">
                                <TabsList className="w-full">
                                    <TabsTrigger value="task">Task</TabsTrigger>
                                    <TabsTrigger value="chapter">Chapter</TabsTrigger>
                                    <TabsTrigger value="project">Project</TabsTrigger>
                                </TabsList>
                                <TabsContent value="task">
                                    <Label className="wt-4">Chapter</Label>
                                    <Button variant="outline"
                                        className={`wt-4 w-full h-20 ${chapterSelected !== 'No chapter selected' ? 'bg-gray-100 border-green-400' : ''}`}
                                        onClick={select_chapter}>{chapterSelected}</Button>
    
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
                                    <Button variant="outline" 
                                    className={`wt-4 w-full h-20 ${projectSelected !== 'No project selected' ? 'bg-gray-100 border-green-400' : ''}`}
                                    onClick={select_project}>{projectSelected}</Button>
                                    
    
                                    <Label className="wt-4">Name</Label>
                                    <Input id="name" placeholder="Name of your chapter" />
    
                                    <Label className="wt-4">Description</Label>
                                    <Textarea />
    
                                    <Label className="wt-4">Acceptance criteria</Label>
                                    <Button variant="outline" className="wt-4 w-full h-20 bg-red-50 hover:bg-red-50/50">
                                        No acceptance criteria defined
                                    </Button>

                                    <Label className="wt-4">Acceptance criteria</Label>
                                    <Button variant="outline" className="wt-4 w-full h-20 bg-blue-50 hover:bg-blue-50/50"
                                        onClick={select_order}>
                                        Chapter order
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
                                    <Button variant="outline" className="wt-4 w-full h-20 bg-red-50 hover:bg-red-50/50"
                                    onClick={go_ac_project}>
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
                case "home_project":
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
                                <Tabs defaultValue="project" className="w-full">
                                    <TabsList className="w-full">
                                        <TabsTrigger value="task">Task</TabsTrigger>
                                        <TabsTrigger value="chapter">Chapter</TabsTrigger>
                                        <TabsTrigger value="project">Project</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="task">
                                        <Label className="wt-4">Chapter</Label>
                                        <Button variant="outline"
                                            className={`wt-4 w-full h-20 ${chapterSelected !== 'No chapter selected' ? 'bg-gray-100 border-green-400' : ''}`}
                                            onClick={select_chapter}>{chapterSelected}</Button>
        
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
                                        <Button variant="outline" 
                                        className={`wt-4 w-full h-20 ${projectSelected !== 'No project selected' ? 'bg-gray-100 border-green-400' : ''}`}
                                        onClick={select_project}>{projectSelected}</Button>
                                        
        
                                        <Label className="wt-4">Name</Label>
                                        <Input id="name" placeholder="Name of your chapter" />
        
                                        <Label className="wt-4">Description</Label>
                                        <Textarea />
        
                                        <Label className="wt-4">Acceptance criteria</Label>
                                        <Button variant="outline" className="wt-4 w-full h-20 bg-red-50 hover:bg-red-50/50">
                                            No acceptance criteria defined
                                        </Button>
    
                                        <Label className="wt-4">Acceptance criteria</Label>
                                        <Button variant="outline" className="wt-4 w-full h-20 bg-blue-50 hover:bg-blue-50/50"
                                            onClick={select_order}>
                                            Chapter order
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
                                        <Button variant="outline" className="wt-4 w-full h-20 bg-red-50 hover:bg-red-50/50"
                                        onClick={go_ac_project}>
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
        case "select_chapter":
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
                                    Choose in which chapter this task belongs. f
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
        case "select_project":
                if (isLoadingProjects){
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
                                            Loading...
                                    </DialogHeader>
                                    <DialogFooter>
                                    <Button type="submit" onClick={go_home_chapter}>Back</Button>
                                    <Button type="submit" onClick={assign_project}>Assign</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    );
                }

                if (errorProjects){
                    return (
                        <div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Create</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    Error 
                                </DialogContent>
                            </Dialog>
                        </div>
                    );
                }

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
                                        <Select onValueChange={(event:any) => handleProjectSelection(event)}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder={projectSelected}  />
                                                </SelectTrigger>
                                                <SelectContent>
                                                {dataProjects ? (
                                                    dataProjects.map((project) => (
                                                        <SelectItem value={project.name} key={project.id}>{project.name}</SelectItem>
                                                    ))) : (
                                                        // Render something else when dataProjects is null or undefined
                                                        <div>No projects available</div>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                </DialogHeader>
                                <DialogFooter>
                                <Button type="submit" onClick={go_home_chapter}>Back</Button>
                                <Button type="submit" onClick={assign_project}>Assign</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                );
        case "select_order":
            return (
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Create</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Choose order</DialogTitle>
                                <DialogDescription>
                                    Choose in which order the new chapter should be.
                                </DialogDescription>
                                    <Label className="wt-4">Project</Label>
                            </DialogHeader>
                            <DialogFooter>
                            <Button type="submit" onClick={go_home_chapter}>Back</Button>
                            <Button type="submit" onClick={go_home_chapter}>Assign</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        case "ac_project":
            return (
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Create</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Acceptance criteria</DialogTitle>
                            </DialogHeader>

                            <Label className="wt-4 wb-4">To be accomplished:</Label>
                            {projectAC.map((ac) => (
                            // eslint-disable-next-line react/jsx-key
                            <div>
                                <AcceptanceCriteria onDelete={() => handleDeleteLabel(ac.id)}/>
                            </div>    
                            ))}

                            <div className="w-full h-4">
                                <button onClick={add_ac_project}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                   
                                </button>
                            </div>
                                    

                            
                            <DialogFooter>
                            <Button type="submit" onClick={go_home_project}>Back</Button>
                            <Button type="submit" onClick={go_home_project}>Assign</Button>
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
    go_home_project
    return (
        <div>
            {renderStep()}
        </div>
        
    )
}
