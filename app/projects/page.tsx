'use client'
import ProjectsContent from '../components/ProjectsContent';
import ReactQueryProvider from '../providers/reactQuery';

export default function Projects() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ReactQueryProvider>
            <div className='grid grid-cols-4 gap-4'>
                <ProjectsContent />
            </div>
        </ReactQueryProvider>
    </main>
  )
}
