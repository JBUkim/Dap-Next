import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

export default function RegisterScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Create Account">
      <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg text-center">
          <h1 class="text-2xl font-bold sm:text-3xl">Sign Up</h1>

          <p class="mt-4 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque ipsa culpa autem, at itaque nostrum!</p>
        </div>

        <form action="" class="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit(submitHandler)}>
          <div class="col-span-6">
            <label htmlFor="name" class="block text-sm font-medium text-gray-700">
              이름
            </label>

            <input
              type="text"
              class="w-full rounded-lg border-slate-300 p-4 pr-12 text-sm drop-shadow-lg"
              id="name"
              autoFocus
              {...register("name", {
                required: "이름을 입력해주세요.",
              })}
            />
            {errors.name && <div className="text-red-500">{errors.name.message}</div>}
          </div>

          <div class="col-span-6">
            <label htmlFor="email" class="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "이메일을 형식을 지켜주세요.",
                },
              })}
              class="w-full rounded-lg border-slate-300 p-4 pr-12 text-sm drop-shadow-lg"
              id="email"
            />
            {errors.email && <div className="text-red-500">{errors.email.message}</div>}
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label htmlFor="password" class="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
                minLength: {
                  value: 6,
                  message: "비밀번호를 5글자 이상 입력하세요.",
                },
              })}
              class="w-full rounded-lg border-slate-300 p-4 pr-12 text-sm drop-shadow-lg"
              id="password"
              autoFocus
            />
            {errors.password && <div className="text-red-500 ">{errors.password.message}</div>}
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label htmlFor="confirmPassword" class="block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>

            <input
              class="w-full rounded-lg border-slate-300 p-4 pr-12 text-sm drop-shadow-lg"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "비밀번호를 한번더 입력해주세요.",
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 3,
                  message: "비밀번호를 2글자 이상 입력하세요.",
                },
              })}
            />
            {errors.confirmPassword && <div className="text-red-500 ">{errors.confirmPassword.message}</div>}
            {errors.confirmPassword && errors.confirmPassword.type === "validate" && <div className="text-red-500 ">비밀번호가 일치하지 않습니다.</div>}
          </div>

          <div class="col-span-6 sm:flex sm:items-center sm:gap-4 flex justify-center">
            <button
              class="inline-block shrink-0 rounded-md border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition 
                  hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring-teal-700 focus:ring-2 active:text-teal-800"
            >
              회원가입
            </button>
          </div>

          <div class="col-span-6 flex justify-center">
            <p class="text-base inline-block mb-2 text-[#adadad] hover:text-primary">
              이미 계정이 있으신가요? &nbsp;
              <Link href={`/signin?redirect=${redirect || "/"}`} class="text-primary text-blue-300 hover:underline">
                로그인
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
}
