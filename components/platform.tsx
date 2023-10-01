import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Platform() {
    return (
        <div className="w-full h-full flex flex-col-reverse">
            <Tabs defaultValue="parking_lot">
            <TabsContent value="parking_lot" className="w-full">
                Parking lot
            </TabsContent>
            <TabsContent value="feedback">
                Feedback
            </TabsContent>
            <TabsList className="w-full">
                <TabsTrigger value="parking_lot">Parking Lot</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
            </Tabs>
        </div>
      

    )
}