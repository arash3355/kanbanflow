"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    function handleLogout() {

        const confirmLogout = window.confirm(
            "Apakah Anda yakin ingin logout?"
        );

        if (!confirmLogout) return;

        localStorage.removeItem("user");

        toast.success("Logout berhasil.");

        router.replace("/");

    }

    useEffect(() => {

        const storedUser = JSON.parse(

            localStorage.getItem("user")

        );

        setUser(storedUser);

    }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm">
            <div className="container">

                <a className="navbar-brand fw-bold text-primary"
                    href="/dashboard">
                    KanbanFlow
                </a>

                <div className="d-flex align-items-center gap-3">

                    <p className="text-secondary mb-0">
                        Welcome back, <b className="text-dark">{user?.name ?? "Guest"}</b>
                    </p>

                    <button
                        className="btn btn-outline-danger"
                        onClick={handleLogout}
                    >
                        Logout

                    </button>

                </div>

            </div>

        </nav>
    );
}