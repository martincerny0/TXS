import { createCallerFactory } from "@/server/api/trpc";
import { createContext } from "@/app/context";
import { appRouter } from "@/server/api/root";



export const caller = createCallerFactory(appRouter)(async () => {
  return await createContext(); 
});