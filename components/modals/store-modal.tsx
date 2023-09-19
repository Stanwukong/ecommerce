"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import Modal from "@/components/ui/modal"

export const StoreModal = () => {

    const storeModal = useStoreModal();

    return (
        <Modal
            title="Create Store"
            desc="New products and categories! Congrats baby girl"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Create Store Form       
        </Modal>
    )
} 