import styles from "./page.module.css";
import SignIn from "./signin/page";
import { redirect } from "next/navigation";
export default function Home() {
  return (
    <main className={styles.main}>
      <SignIn />
    </main>
  );
}
