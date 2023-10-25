import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"
import { initialProfile } from "@/lib/initial-profile"

const SetupPage = async () => {
  const profile = await initialProfile()

  const server = await prisma.server.findFirst({
    where: {
        members: {
            some:{
                profileId: profile.id
            }
        }
    }
  })

  if(server) {
    redirect(`/server/${server.id}`)
  }

  return (
    <div>SetupPage</div>
  )
}

export default SetupPage