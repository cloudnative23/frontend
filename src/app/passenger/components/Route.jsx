


export default function Route({props}) {
    return (
        <div className="bg-white mx-5 my-1 w-full h-40">
            <div className="ml-2.5 mt-2 flex">{props.year} / {props.month} / {props.day}</div>
            <div className="flex mt-2">
                <p className="bg-lime-400 text-black w-9 ml-4">上班</p>
                <p className='w-16 ml-4'> {props.start_time} </p>
                <p className='w-auto ml-4'> {props.start} </p>
            </div>
            <div className="flex mt-2">
                <p className="bg-red-400 text-black w-9 ml-4">下班</p>
                <p className='w-16 ml-4'> {props.end_time} </p>
                <p className='w-auto ml-4'> {props.end} </p>
            </div>
            <div className="flex text-dark_o ml-4 mt-2.5">司機 <p className="text-black ml-4">{props.driver}</p></div>
            <button className="bg-dark_o text-white float-right rounded-xl w-20 mb-1 mr-2">發送請求</button>
        </div>
    )
}
