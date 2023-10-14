"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type TUsers = {
  email: string;
  password: string;
  name: string;
};

function AddUser() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TUsers>({
    mode: "onBlur",
  });

  const createUser = async (data: TUsers) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users", data);

      if (res && res.status === 200 && res.data?.success) {
        toast({
          title: "user added",
        });
        router.push("/users");
      } else {
        toast({
          title: "Failed to add user",
          description: res?.data?.err,
          variant: "destructive",
        });
        router.push("/users");
      }
    } catch (err: any) {
      console.log("Error on adding user", err);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        toast({
          title: "Failed to add user",
          description: "Permission denied",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster />
      <div>
        <h1 className="text-2xl font-bold">Add New User</h1>
      </div>
      <form onSubmit={handleSubmit(createUser)}>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>Name</Label>
            <Input
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
            />
            {errors && errors?.name && errors?.name?.message && (
              <small className="text-red-500  block">
                {errors?.name?.message}
              </small>
            )}
          </div>
          <div>
            <Label>Email</Label>
            <Input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
            />
            {errors && errors?.email && errors?.email?.message && (
              <small className="text-red-500  block">
                {errors?.email?.message}
              </small>
            )}
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "password is required",
                },
              })}
            />
            {errors && errors?.password && errors?.password?.message && (
              <small className="text-red-500  block">
                {errors?.password?.message}
              </small>
            )}
          </div>
          <div>
            <Button disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
