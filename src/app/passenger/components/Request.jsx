import Link from "next/link";

export default function Request({ props }) {
  const weekMap = ["一", "二", "三", "四", "五", "六", "日"];

  const statusMap = {
    new: "等待回覆",
    accepted: "被接受",
    denied: "被拒絕",
    expired: "已過期",
    deleted: "已刪除",
    canceled: "已取消",
  };
  const statusColorMap = {
    new: "text-dark_o",
    accepted: "text-lime-600",
    denied: "text-rose-500",
    expired: "text-slate-500",
    deleted: "text-slate-500",
    canceled: "text-slate-500",
  };
  // const encodedInfo = encodeURIComponent(JSON.stringify(info));

  var date = new Date(props["route"].date);
  const encodedInfo = encodeURIComponent(JSON.stringify(props));

  return (
    <Link
      href="/passenger/checkRequest"
      as={`/passenger/checkRequest?info=${encodedInfo}`}
      className="mx-4  my-1 h-36 w-full bg-white"
    >
      <div className="ml-2.5 mt-2 flex">
        {date.getFullYear()} / {date.getMonth() + 1} / {date.getDate()} (
        {weekMap[date.getDay()]})
      </div>
      <div className="mt-2 flex">
        <p className="ml-4 w-9 bg-go2work_light py-0.5 text-center text-sm text-black">
          上車
        </p>
        <p className="ml-1 w-20">
          {" "}
          {props["on-station"].datetime.slice(-8, -3)}{" "}
        </p>
        <p className="w-auto"> {props["on-station"].name} </p>
      </div>
      <div className="mt-2 flex">
        <p className="ml-4 w-9 bg-go2home_light py-0.5 text-center text-sm text-black">
          下車
        </p>
        <p className="ml-1 w-20 ">
          {" "}
          {props["off-station"].datetime.slice(-8, -3)}{" "}
        </p>
        <p className="w-auto"> {props["off-station"].name}</p>
      </div>
      <div className="ml-4 mt-2.5 flex text-dark_o">
        <p>司機</p>
        <div className="ml-3 h-6 w-6 overflow-hidden rounded-full border border-blue-500">
          <img src={props["route"].driver.avatar} className="h-full w-full" />
        </div>
        <p className="ml-2 text-black">{props["route"].driver.name}</p>
        <div
          className={
            statusColorMap[props["status"]] +
            " mb-1 ml-auto mr-2 w-20 rounded-xl border border-slate-400 text-center font-bold"
          }
        >
          {statusMap[props["status"]]}
        </div>
      </div>
    </Link>
  );
}
