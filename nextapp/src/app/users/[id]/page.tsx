"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type TUsers = {
  email: string;
  name: string;
};

function UpdateUser({ params }: any) {
  // console.log("Request Param :: ", params.id);
  const route = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<TUsers>({
    mode: "onBlur",
  });

  const updateUser = async (data: TUsers) => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/users/${params.id}`, data);

      if (res && res.status === 200 && res.data?.success) {
        toast({
          title: "user updated",
        });
        route.push("/users");
      } else {
        toast({
          title: "Failed to update user",
          description: res?.data?.err,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      console.log("Error on adding user", err);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        toast({
          title: "Failed to update user",
          description: "Permission denied",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`/api/users/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Get user data : ", data);
        if (data?.success) {
          setValue("email", data.data?.email);
          setValue("name", data?.data?.name);
        } else {
          toast({
            title: "Forbidden",
            description: "You are unauthorized to access this page",
            variant: "destructive",
          });
          route.push("/users");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <Toaster />
      <div>
        <h1 className="text-2xl font-bold">Add New User</h1>
      </div>
      <form onSubmit={handleSubmit(updateUser)}>
        <div className="grid grid-cols-2 gap-3">
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
            <Button disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
