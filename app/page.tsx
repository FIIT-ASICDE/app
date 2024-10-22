import { PrismaClient } from "@prisma/client";


var db: PrismaClient = new PrismaClient()


export default async function Home() {
    var allUsers;
    try {
        allUsers = await db.users.findMany({
            where: {
                name: "Daniel"
            }
        });

        if (allUsers.length == 0) {
            await db.users.create({
                data: {
                    name: "Daniel",
                    email: "daniel@sawa.sk"
                }
            })
        }
        console.log(allUsers)
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                {allUsers.length ? allUsers[0].name : "no users, refresh this page!"}
            </div>
        );
    }
    catch {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                No db conncetion!
            </div>
        );
    }


}
