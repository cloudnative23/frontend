import Link from "next/link";

export default function Route({ props, startStation, endStation, myRequest }) {
  const weekMap = ["一", "二", "三", "四", "五", "六", "日"];

  var on = null;
  var off = null;
  for (var i = 0; i < props.stations.length; i++) {
    if (props.stations[i].id == startStation) on = props.stations[i];
    if (props.stations[i].id == endStation) off = props.stations[i];
  }
  // var crossDay = false
  // if(on.datetime.slice(8,10) != off.datetime.slice(8,10))
  //     crossDay = true
  var info = props;
  info.on = on;
  info.off = off;
  const encodedInfo = encodeURIComponent(JSON.stringify(info));

  var date = new Date(on.datetime.slice(0, 10));

  var already_sent = false;

  if (myRequest.includes(props.id)) already_sent = true;

  return (
    <div className="mx-5 my-1 h-40 w-full bg-white">
      <div className="ml-2.5 mt-2 flex">
        {date.getFullYear()} / {date.getMonth() + 1} / {date.getDate()} (
        {weekMap[date.getDay()]})
      </div>
      <div className="mt-2 flex">
        <p className="ml-4 w-9 bg-go2work_light py-0.5 text-center text-sm text-black">
          上車
        </p>
        <p className="ml-1 w-24"> {on.datetime.slice(-8, -3)} </p>
        <p className="ml-4 w-auto"> {on.name} </p>
      </div>
      <div className="mt-2 flex">
        <p className="ml-4 w-9 bg-go2home_light py-0.5 text-center text-sm text-black">
          下車
        </p>
        <p className="ml-1 w-24"> {off.datetime.slice(-8, -3)} </p>
        <p className="ml-4 w-auto"> {off.name}</p>
      </div>
      <div className="ml-4 mt-2.5 flex text-dark_o">
        司機
        <div className="ml-3 h-6 w-6 overflow-hidden rounded-full border border-blue-500">
          <img src={props.driver.avatar} className="h-full w-full" />
        </div>
        <p className="ml-2 text-black">{props.driver.name}</p>
      </div>
      {already_sent ? (
        <div className="float-right	mb-1 mr-2 w-20 rounded-xl bg-slate-400 text-white">
          已送出
        </div>
      ) : (
        <Link
          href="/passenger/request"
          as={`/passenger/request?info=${encodedInfo}`}
          className="float-right mb-1 mr-2 w-20 rounded-xl bg-dark_o text-white"
        >
          發送請求
        </Link>
      )}
    </div>
  );
}
