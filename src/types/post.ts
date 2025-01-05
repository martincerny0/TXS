export interface Post {
    id: number;
      user: {
          id: number;
          name: string;
          tag: string;
      },
      content: string;
      createdAt: Date;
  }