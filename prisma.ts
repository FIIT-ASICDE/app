import { PrismaClient } from "@/lib/prisma";
import { DefaultArgs } from "@/lib/prisma/runtime/library";
import { PrismaPg } from "@prisma/adapter-pg";

// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
export const prismaClientSingleton = (
    connectionString = `${process.env.DATABASE_URL}`,
) => {
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export type PrismaType = PrismaClient<
    { adapter: PrismaPg },
    never,
    DefaultArgs
>;

const prisma: PrismaType = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
