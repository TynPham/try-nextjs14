"use server";

import { UserBody } from "@/types/users.type";
import { revalidatePath } from "next/cache";

export const createUser = async (body: UserBody) => {
  await fetch("http://localhost:8000/users", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  revalidatePath("users");
};

export const deleteUser = async (id: number) => {
  await fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  revalidatePath("users");
};

export const updateUser = async (body: UserBody, id: number) => {
  await fetch(`http://localhost:8000/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  revalidatePath("users");
};

export const getDetailsUser = async (id: number) => {
  const data = await fetch(`http://localhost:8000/users/${id}`, {
    cache: "no-store",
  });
  return data.json();
};
