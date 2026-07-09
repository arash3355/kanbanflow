"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layout/AuthLayout";

import toast from "react-hot-toast";

export default function RegisterPage() {

    const router = useRouter();

    const [form, setForm] = useState({

        name: "",

        username: "",

        email: "",

        password: ""

    });

    function handleChange(e) {

        const { name, value } = e.target;

        setForm({

            ...form,

            [name]: value

        });

    }

    async function handleRegister(e) {

        e.preventDefault();

        try {

            const response = await fetch(

                "http://localhost:3001/register",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify(form)

                }

            );

            const result = await response.json();

            if (!response.ok) {

                toast.error(result.message);

                return;

            }

            toast.success(result.message);

            router.push("/login");

        }

        catch (err) {

            toast.error(err.message);

        }

    }

    return (

        <AuthLayout

            title="KanbanFlow"

            subtitle="Create your account"

            footer={

                <p className="auth-footer">

                    Already have an account?

                    {" "}

                    <Link href="/login">

                        Login

                    </Link>

                </p>

            }

        >

            <form onSubmit={handleRegister}>

                <Input

                    name="name"

                    placeholder="Full Name"

                    value={form.name}

                    onChange={handleChange}

                />

                <Input



                    name="username"



                    placeholder="Username"



                    value={form.username}



                    onChange={handleChange}



                />



                <Input



                    type="email"



                    name="email"



                    placeholder="Email"



                    value={form.email}



                    onChange={handleChange}



                />



                <Input



                    type="password"



                    name="password"



                    placeholder="Password"



                    value={form.password}



                    onChange={handleChange}



                />

                <Button type="submit">

                    Register

                </Button>

            </form>

        </AuthLayout>

    );

}