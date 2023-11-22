// Home Page
// You can edit or delete this example
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center bg-red-500">
        <Link href="/login">Go to Login Page </Link>
        <Link href="/driver">Go to Driver Page </Link>
        <Link href="/passenger">Go to Passenger Page </Link>
        <Link href="/driver/editRoute">Hello</Link>
      </div>
    </>
  );
}
