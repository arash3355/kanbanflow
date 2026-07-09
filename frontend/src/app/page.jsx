import Hero from "@/components/landing/Hero";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="landing">

      <Hero />

      <section className="preview">

        <div className="column">

          <h2>Todo</h2>

          <div className="task-card">

            <h3>Learn Next.js</h3>

            <span>High Priority</span>

          </div>

        </div>

        <div className="column">

          <h2>Doing</h2>

          <div className="task-card">

            <h3>Build Backend API</h3>

            <span>Medium Priority</span>

          </div>

        </div>

        <div className="column">

          <h2>Done</h2>

          <div className="task-card">

            <h3>Install PostgreSQL</h3>

            <span>Completed</span>

          </div>

        </div>

      </section>

    </main>
  );
}