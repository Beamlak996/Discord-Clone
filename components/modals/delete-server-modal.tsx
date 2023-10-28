"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteServerModal = () => {
  const router = useRouter()

  const { isOpen, onClose, type, data } = useModal();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;

  const onClick = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/servers/${server?.id}`)

      onClose()
      router.refresh()
      router.push("/")
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500" >
            Are you sure you want to do this?
            <br />
            <span className="text-indigo-500 font-semibold" >{server?.name}</span> will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4 " >
          <div className="flex item-center justify-end gap-x-2 w-full" >
            <Button
              disabled={isLoading}
              onClick={onClose}
              className="bg-zinc-600 text-white hover:bg-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              className="bg-rose-600 text-white hover:bg-rose-500"
              onClick={onClick}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
