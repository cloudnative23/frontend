// Home Page
// You can edit or delete this example
import { Roboto } from "next/font/google";
import Link from "next/link";

import SettingsIcon from "@mui/icons-material/Settings";

const inter = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center items-stretch bg-[#F4F4F4]">
      <nav className="flex flex-row justify-between p-2">
        <div>TSMC COMMUTING</div>
        <SettingsIcon />
      </nav>
      <div className="mt-8 w-11/12 self-center">
        <div className="rounded-xl bg-white text-center">歡迎</div>
      </div>

      <div
        className={`mb-0 pt-44 text-center text-xl font-bold tracking-widest text-[#757575] ${inter.className}`}
      >
        TSMC
      </div>
      <div
        className={`mt-0 pt-0.5 text-center text-xl font-bold tracking-widest text-[#757575] ${inter.className}`}
      >
        COMMUTING{" "}
      </div>
      <div className="mt-16 w-3/12 self-center rounded-xl bg-[#757575] pb-0.5 pt-0.5 text-center text-white">
        <Link href="/login"> 點此開始 </Link>
      </div>
    </div>
  );
}
