import { useSocket } from "@/components/providers/socket-provider"
import { Member, Message, Profile } from "@prisma/client"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

type ChatSocketProps = {
    addKey: string
    updateKey: string
    queryKey: string
}

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

export const useChatSocket = ({
    addKey,
    updateKey,
    queryKey
}: ChatSocketProps) => {
    const { socket } = useSocket()
    const queryClient = useQueryClient()

    useEffect(()=> {
        if(!socket) {
            return
        }

        socket.on(updateKey, (message: MessageWithMemberWithProfile)=> {
            queryClient.setQueryData([queryKey], (oldDate: any)=> {
                if(!oldDate || !oldDate.pages || oldDate.pages.length === 0) return oldDate

                const newData = oldDate.pages.map((page: any)=> {
                    return {
                        ...page,
                        items: page.items.map((item: MessageWithMemberWithProfile)=> {
                            if(item.id === message.id) {
                                return message
                            }
                            return item
                        })
                    }
                })
                return {
                    ...oldDate,
                    pages: newData
                }
            })
        })
        socket.on(addKey, (message: MessageWithMemberWithProfile)=> {
            queryClient.setQueryData([queryKey], (oldData: any)=> {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [{
                            items: [message]
                        }]
                    }
                }
                const newData = [...oldData.pages]
                newData[0] = {
                    ...newData[0],
                    items: [
                        message,
                        ...newData[0].items
                    ]
                }

                return {
                    ...oldData,
                    pages: newData
                }
            })
        })
        return ()=> {
            socket.off(addKey)
            socket.off(updateKey)
        }
    }, [queryClient, addKey, queryKey, socket, updateKey])
}