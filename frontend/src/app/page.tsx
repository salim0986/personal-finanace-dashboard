// import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/transaction"}>Transaction</Link>
        <Link href={"/goals"}>Goals</Link>
        <Link href={"/assets"}>Assets</Link>
        <Link href={"/journals"}>Journals</Link>
      </nav>
    </main>
  );
}
