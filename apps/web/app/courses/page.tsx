"use client";

import Link from "next/link";
import styles from "./courses.module.css";

export default function Courses() {
  return (
    <main className={styles.coursePage}>
      <section className={styles.assignments}>
        <Link href="/assignments" className={styles.assignmentsHeader}>
          assignments
        </Link>
        <ul className={styles.assignmentList}>
          <li>Assignment 1</li>
          <li>Assignment 2</li>
          <li>Assignment 3</li>
          <li>Assignment 4</li>
        </ul>
      </section>
      <aside className={styles.overview}>
        <div className={styles.overviewBox}>grade</div>
        <div className={styles.overviewBox}>materials</div>
        <div className={styles.overviewBox}>people</div>
      </aside>
    </main>
  );
}
