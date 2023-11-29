import IndexButton from "@/components/IndexButton";
import ShowWaiting from "@/components/ShowWaiting";

export default function Driver() {
  return (
    <>
      <div className="flex justify-center">
        <div className="bg-white w-11/12 rounded-xl">
          <div className="flex justify-center space-x-2 my-2">
            <IndexButton name="新增行程" icon="AddSchedule" />
            <IndexButton name="尋找乘客" icon="FindPassenger" />
            <IndexButton name="查看行程" icon="CheckSchedule" />
            <IndexButton name="共乘紀錄" icon="AllSchedule" />
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-2 my-2">
        <ShowWaiting whoWait="driver" waitFor="driver"/>
        <ShowWaiting whoWait="driver" waitFor="passenger" />
      </div>
      <p>This is Driver!</p>
    </>
  );
}
