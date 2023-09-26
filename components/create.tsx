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
                selectedButton === value ? "bg-gray-100 border-green-300" : ""
                }`} // Apply the gray background class conditionally
            >
                {value}
            </Button>
            </label>
        ))}
        </div>
    );
};

export default function Create() {
    const [priority, setPriority] = useState(null);
    const [date, setDate] = React.useState<Date>()

    const handleValueChange = (value: any) => {
        setPriority(value);
    };

    const { currentStep, chapter_critertia, previousStep, resetWizard, go_home } = useWizardContext();

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
                                <Button variant="outline" className="wt-4 w-full h-20" onClick={chapter_critertia}>No chapter selected</Button>

                                <Label className="wt-4">Name</Label>
                                <Input id="name" placeholder="Name of your task" />

                                <Label className="wt-4">Description</Label>
                                <Textarea />
                                
                                <Label className="wt-8">Priority</Label>
                                <Priority
                                    values={values}
                                    selectedValue={priority}
                                    onSelect={handleValueChange}
                                />

                                <Label className="wt-4">Deadline</Label>
                                <Input id="name" placeholder="Name of your task" />
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
                            </TabsContent>
                            <TabsContent value="project">
                                <Label className="wt-4">Name</Label>
                                <Input id="name" placeholder="Name of your project" />

                                <Label className="wt-4">Description</Label>
                                <Textarea />

                                <Label className="wt-4">Acceptance criteria</Label>
                                <Button variant="outline" className="wt-4 w-full h-20 bg-red-50 hover:bg-red-50/50">
                                    No acceptance criteria defined
                                </Button>
                            </TabsContent>
                        </Tabs>
                    </DialogHeader>
                    <DialogFooter>
                    <Button type="submit">Create</Button>
                    </DialogFooter>
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
                            <Button type="submit">Create</Button>
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
