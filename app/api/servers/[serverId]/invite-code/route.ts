import { currentProfile } from "@/lib/current-profile"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { v4 as uuidV4 } from "uuid"

export async function PATCH(req: Request, {params}: {params: {serverId: string}}) {
    try {
        const profile = await currentProfile() 
        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if(!params.serverId) {
            return new NextResponse("Server id is required", { status: 400 })
        }

        const server = await prisma.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                inviteCode: uuidV4()
            }
        })

        return NextResponse.json(server)
    } catch (error) {
        console.log("[SERVER_ID]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}