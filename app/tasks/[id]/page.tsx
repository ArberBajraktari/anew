'use client'
import { usePathname } from 'next/navigation';

export default function TaskPage() {
  const navigation = usePathname();

  return (
    <div className="container mx-auto my-10">
      {/* Use the id parameter here */}
      <h1>Task Page for ID: {navigation}</h1>
    </div>
  );
}
