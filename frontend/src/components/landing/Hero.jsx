"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {

    const router = useRouter();

    return (

        <section className="hero">

            <div className="hero-left">

                <span className="hero-badge">

                    🚀 KanbanFlow

                </span>

                <h1>

                    Organize Your Tasks,
                    <br />
                    Achieve More Every Day.

                </h1>

                <p>

                    KanbanFlow helps you manage tasks,
                    organize projects, and boost productivity
                    through a simple Kanban board.

                </p>

                <div className="hero-buttons">

                    <button

                        className="button"

                        onClick={() => router.push("/login")}

                    >

                        Login

                    </button>

                    <button

                        className="secondary-button"

                        onClick={() => router.push("/register")}

                    >

                        Register

                    </button>

                </div>

            </div>

            <div className="hero-right">

                <Image

                    src="/hero-1.png"

                    width={600}

                    height={500}

                    alt="Kanban Illustration"

                    priority

                />

            </div>

        </section>

    );

}