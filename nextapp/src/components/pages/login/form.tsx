"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AxiosInstance from "@/utils/AxiosInstance";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type TLogin = {
  email: string;
  password: string;
};

function Form() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    mode: "onBlur",
  });

  const login = async (data: TLogin) => {
    try {
      setLoading(true);
      const res: AxiosResponse = await axios.post("/api/login", data);
      if (res && res.status === 200) {
        router.push("/users");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[450px] py-8">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(login)}>
          <div className="grid w-full items-center gap-8">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="foo@example.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email",
                  },
                })}
              />
              {errors && errors?.email && (
                <small className="text-red-500">{errors.email.message}</small>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is required",
                  },
                })}
              />
            </div>
            <div>
              <Button
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-700"
              >
                {loading ? "Signing in ..." : "Sign in"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {error && (
          <div className="py-1 rounded text-sm px-5 text-center bg-red-200 text-red-500 w-full">
            {error}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default Form;
