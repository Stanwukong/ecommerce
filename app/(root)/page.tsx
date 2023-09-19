"use client"

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";


export default function RootPage() {

  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen])


  const demo = () => {
    alert("Still in development");
  }

  return (
    <div className="p-4">
      <div>This is a protected route</div>
      <UserButton afterSignOutUrl="/" showName />
      <Modal title="Test" desc="desc" isOpen onClose={() => { }}>Children</Modal>
      <div className="flex items-center justify-center">
        <Button size={"default"} variant={"outline"} onClick={demo}>Click me</Button>
      </div>
    </div>
  )
}
