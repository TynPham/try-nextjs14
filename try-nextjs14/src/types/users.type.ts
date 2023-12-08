export type User = {
  id: number;
  email: string;
  name: string;
};

export type UserBody = Omit<User, "id">;
