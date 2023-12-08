import { getDetailsUser } from "@/actions/users.actions";
import UserDetails from "@/components/users/UserDetails";
import React from "react";

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const user = await getDetailsUser(Number(id));
  return (
    <div>
      <UserDetails user={user} />
    </div>
  );
}
