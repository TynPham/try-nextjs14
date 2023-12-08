import { deleteUser } from "@/actions/users.actions";
import UserTable from "@/components/users/UserTable";
import React from "react";

const LIMIT = 2;

export default async function User({ searchParams }: { searchParams: any }) {
  const page = searchParams?.page || 1;
  const data = await fetch(`http://localhost:8000/users?_page=${page}&_limit=${LIMIT}`, {
    method: "GET",
    next: { tags: ["users"] },
    cache: "no-store",
  });
  const total = data.headers.get("x-total-count") || 0;
  const users = await data.json();

  return (
    <div>
      <UserTable users={users} meta={{ total: Number(total), current: Number(page), pageSize: LIMIT }} />
    </div>
  );
}
