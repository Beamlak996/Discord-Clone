import { currentProfile } from "@/lib/current-profile"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: {params: {serverId: string}}) {
    try {
        const profile = await currentProfile()
        const { name, imageUrl } = await req.json()

        if(!profile) return new NextResponse("Unauthorized", { status: 401 })

        const server = await prisma.server.updateMany({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl
            }
        })

        return NextResponse.json(server)
    } catch (error) {
        console.log("[SERVER_Id_PATCH]", error)
        return new NextResponse("Internal error", { status: 501 })
    }
}