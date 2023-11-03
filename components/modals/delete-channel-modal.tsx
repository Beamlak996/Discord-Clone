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
import { useRouter } from "next/navigation";

import axios from "axios";
import qs from "query-string"

const DeleteChannelModal = () => {
  const router = useRouter()

  const { isOpen, onClose, type, data } = useModal();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deleteChannel";
  const { server, channel } = data;

  const onClick = async () => {
    try {
      setIsLoading(true)

      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      })

      await axios.delete(url)

      onClose()
      router.refresh()
      router.push(`/servers/${server?.id}`)
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
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500" >
            Are you sure you want to do this?
            <br />
            <span className="text-indigo-500 font-semibold" >#{channel?.name}</span> will be permanently deleted.
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

export default DeleteChannelModal;
