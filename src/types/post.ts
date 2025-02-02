import type { User } from "next-auth";

export interface Post {
    id: number;
      user: User;
      content: string;
      createdAt: Date;
  }