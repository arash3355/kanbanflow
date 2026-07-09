"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthLayout from "@/components/layout/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {

    const router = useRouter();

    const [form, setForm] = useState({

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

    async function handleLogin(e) {

        e.preventDefault();

        try {

            const response = await fetch(

                "http://localhost:3001/login",

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

                alert(result.message);

                return;

            }

            localStorage.setItem(

                "user",

                JSON.stringify(result.data)

            );

            router.push("/dashboard");

        }

        catch (err) {

            alert(err.message);

        }

    }

    return (

        <AuthLayout
            title="Welcome Back"
            subtitle="Login to your KanbanFlow account"
            footer={
                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link href="/register">
                        Register
                    </Link>
                </p>
            }
        >
            <form onSubmit={handleLogin}>

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
                    Login
                </Button>

            </form>

        </AuthLayout>
    );
}