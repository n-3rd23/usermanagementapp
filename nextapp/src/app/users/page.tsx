"use client";
import { Users, columns } from "@/components/pages/users/columns";
import { DataTable } from "@/components/shared/data-table";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Users() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/users?page=0&perPage=10")
      .then((res) => res.json())
      .then((data) => {
        setData(data?.data);
      });
  }, []);
  console.log("Data :: ", data);
  return (
    <div className="container mx-auto">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-bold text-3xl">Users</h1>
        <Link href="/users/create">
          <div className="border bg-blue-500 text-white border-blue-400 px-3 py-2 hover:bg-blue-600">
            Add User
          </div>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export const revalidate = 0;
