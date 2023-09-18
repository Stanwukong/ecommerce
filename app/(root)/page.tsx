"use client"

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";


export default function RootPage() {

  const demo = () => {
    alert("Still in development");
  }

  return (
   <div className="p-4">
    <div>This is a protected route</div>
    <UserButton afterSignOutUrl="/" showName/>
    <div className="flex items-center justify-center">
      <Modal title="test" desc="desc" isOpen onClose={() => {}}>Children</Modal>
    <Button size={"default"} variant={"outline"} onClick={demo}>Click me</Button>
    </div>
   </div>
  )
}
