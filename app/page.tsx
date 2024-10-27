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
                    email: "daniel@sawa.sk",
                    password: "password",
                    nickname: "Danielino"
                }
            })
        }
        console.log(allUsers)
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                {allUsers.length ? JSON.stringify(allUsers) : "no users, refresh this page!"}
            </div>
        );
    }
    catch (err) {
        console.log(err)
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                No db conncetion!
            </div>
        );
    }



    let result: string | null = null;


    const userName: string = result!;
    console.log(userName)
}
