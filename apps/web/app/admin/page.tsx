"use client";

import styles from "./admin.module.css";

export default function Admin() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>admin console</h1>
      <section className={styles.panel}>
        <div className={styles.panelLabel}>settings</div>
      </section>
    </main>
  );
}
