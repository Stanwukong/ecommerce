"use client"

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export default function RootPage() {

  const demo = () => {
    alert("Still in development");
  }

  return (
   <div className="p-4">
    <Button size={"default"} variant={"outline"} onClick={demo}>Click me</Button>
    <div>This is a protected route</div>
    <UserButton afterSignOutUrl="/"/>
   </div>
  )
}
