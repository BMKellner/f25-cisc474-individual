"use client";

import Link from "next/link";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Landing() {
  return (
    <div className={styles.page}>
      <header className={styles.topRight}>
        <Link href="/admin">
          <Button appName="web" className={styles.adminButton}>
            Admin
          </Button>
        </Link>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>CISC474 Project</h1>

        <div className={styles.authCard}>
          <Button appName="web" className={styles.authButton}>
            Sign Up
          </Button>

          <Link href="/dashboard">
            <Button appName="web" className={styles.authButton}>
              Sign In
            </Button>
          </Link>

          <p className={styles.forgot}>Forgot password?</p>
        </div>
      </main>
    </div>
  );
}
