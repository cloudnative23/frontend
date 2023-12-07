// Home Page
// You can edit or delete this example
import Link from "next/link";
import SettingsIcon from '@mui/icons-material/Settings';
import { Roboto } from 'next/font/google'

const inter = Roboto({ subsets: ['latin'], weight: ["400", "700"]})

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-[#F4F4F4] items-stretch h-full">
      <nav className="flex flex-row justify-between p-2">
        <div>TSMC COMMUTING</div>
        <SettingsIcon />
      </nav>
      <div className="w-11/12 self-center mt-8">
        <div className="bg-white text-center rounded-xl">歡迎</div>
      </div>

      <div className={`pt-44 mb-0 text-center text-[#757575] font-bold tracking-widest text-xl ${inter.className}`}>TSMC</div>
      <div className={`pt-0.5 mt-0 text-center text-[#757575] font-bold tracking-widest text-xl ${inter.className}`}>COMMUTING </div>
      <div className="self-center text-center w-3/12 mt-16 pt-0.5 pb-0.5 rounded-xl bg-[#757575] text-white">
        <Link href="/login"> 點此開始 </Link>
      </div>
    </div>
  );
}
