"use client"

import { Button } from "@/components/ui/button";


export default function Home() {

  const demo = () => {
    alert("Still in development");
  }

  return (
   <div className="p-4">
    <Button size={"default"} variant={"outline"} onClick={demo}>Click me</Button>
   </div>
  )
}
