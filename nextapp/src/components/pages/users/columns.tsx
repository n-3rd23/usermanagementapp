"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import Link from "next/link";

export type Users = {
  id: number;
  name: string;
  email: string;
  roles: Record<any, any>;
};
const deleteUser = async (id: number) => {
  try {
    const res = await axios.delete(`/api/users/${id}`);
    if (res && res.status === 200 && res.data?.success) {
      alert("user deleted");
    } else {
      alert("forbidden");
    }
  } catch (err) {
    console.log();
  }
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "roles",
    header: "Role",
    cell: ({ row }) => {
      const data = row.original;
      return <div>{data?.roles?.role}</div>;
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DotsHorizontalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white px-0">
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/users/${data.id}`} className="w-full h-full">
                  <div className="w-full h-full">Update</div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="bg-red-500 text-white flex items-center focus:bg-red-600 focus:text-white">
                <TrashIcon />
                <span onClick={() => deleteUser(data.id)}>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
