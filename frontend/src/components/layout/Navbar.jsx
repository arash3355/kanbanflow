"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";

export default function Navbar() {

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

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm">
            <div className="container">

                <a className="navbar-brand fw-bold text-primary"
                    href="/dashboard">
                    KanbanFlow
                </a>

                <div className="d-flex align-items-center gap-3">

                    <a className="nav-link" href="/dashboard">
                        Dashboard
                    </a>

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