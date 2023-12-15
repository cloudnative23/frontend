import Link from "next/link";

import IndexButton from "@/components/IndexButton";
import ShowWaiting from "@/components/ShowWaiting";

export default function Driver() {
  return (
    <>
      <div className="flex justify-center">
        <div className="bg-white w-11/12 rounded-xl">
          <div className="flex justify-center space-x-2 my-2">
            <Link href={"driver/createRoute"}>
              <IndexButton name="新增行程" icon="AddSchedule" />
            </Link>
            <IndexButton name="尋找乘客" icon="FindPassenger" />
            <Link href={"driver/futureRoute"}>
              <IndexButton name="查看行程" icon="CheckSchedule" />
            </Link>
            <Link href={"driver/futureRoute"}>
              <IndexButton name="共乘紀錄" icon="AllSchedule" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-2 my-2">
        <Link href={"driver/allRequest"}>
          <ShowWaiting whoWait="driver" waitFor="driver" />
        </Link>
        <ShowWaiting whoWait="driver" waitFor="passenger" />
      </div>
      <p>This is Driver!</p>
    </>
  );
}
