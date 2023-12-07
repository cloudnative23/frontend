import Link from "next/link";
import SettingsIcon from '@mui/icons-material/Settings';
import AirlineSeatReclineNormalTwoToneIcon from '@mui/icons-material/AirlineSeatReclineNormalTwoTone';
import ToysTwoToneIcon from '@mui/icons-material/ToysTwoTone';


export default function Choose(props) {
    return (
        <div className="flex flex-col items-center bg-[#F4F4F4] items-stretch">
          <nav className="flex flex-row justify-between p-2">
            <div>TSMC COMMUTING</div>
            <SettingsIcon />
          </nav>
          <div className="w-11/12 self-center mt-8">
            <div className="bg-white text-center rounded-xl">選擇身份</div>
          </div>
    
          <div className="pt-20 mb-0 text-center">歡迎 {props.name}, 您想當乘客還是司機呢？</div>


          <div className="w-6/12 flex self-center justify-between mt-24 text-white">
            <Link href="/passenger" className="basis-14 bg-[#DC8352] text-center rounded-xl text-xl">
                <div>
                    <AirlineSeatReclineNormalTwoToneIcon /> <br /> <div className="inline-block text-base">乘客</div>
                </div>
            </Link>
            <Link href="/driver" className="basis-14 bg-[#5184CF] text-center rounded-xl text-xl">
                <div>
                <ToysTwoToneIcon /> <br /> <div className="inline-block text-base">司機</div>
                </div>
            </Link>
          </div>
          
        </div>
      );
}