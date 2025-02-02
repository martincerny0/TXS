import { Prisma, PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";

const prisma = new PrismaClient();

export async function createContext() {
  const session: Session | null = null; 

  return {
    headers: new Request("http://localhost").headers,
    db: prisma,
    session,
  };
}