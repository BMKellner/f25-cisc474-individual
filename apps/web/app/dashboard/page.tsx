"use client";

import Link from "next/link";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <aside className={styles.column}>
        <Link href="/courses" className={styles.colHeader}>
          courses
        </Link>
        <div className={styles.colBody}>
          <ul className={styles.courseList}>
            <li>Course A</li>
            <li>Course B</li>
            <li>Course C</li>
          </ul>
        </div>
      </aside>
       {/* AI-generated section:
Middle column for the page, confusing syntax, was seeking clarity */}
      <section className={`${styles.column} ${styles.withDivider}`}>
        <header className={styles.colHeader}>deadlines</header>
        <div className={styles.colBody}>
          <ul className={styles.deadlineList}>
            <li><span>Sep 02</span> HW 1 due</li>
            <li><span>Sep 06</span> Project proposal</li>
            <li><span>Sep 13</span> Quiz 1</li>
            <li><span>Sep 18</span> Lab report</li>
            <li><span>Sep 25</span> Milestone 1</li>
          </ul>
        </div>
      </section>
     {/*Section End*/}
      <section className={`${styles.column} ${styles.withDivider}`}>
        <header className={styles.colHeader}>feedback</header>
        <div className={styles.colBody}>
          <ul className={styles.feedbackList}>
            <li>HW 0 — “Good job on tests.”</li>
            <li>Lab 1 — “Refactor function names.”</li>
            <li>Proj — “Add README setup steps.”</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
