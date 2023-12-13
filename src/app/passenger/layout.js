import Navbar from "@/components/Navbar";

function PassengerLayout({children}) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="flex flex-col container mx-auto w-mobile h-mobile overflow-hidden bg-passenger">
      {/* <nav className="flex h-16 w-full pb-10"> */}
      <Navbar mode="passenger" />
      {/* </nav> */}
      <div className="h-full w-full overflow-y-auto overflow-hidden">{children}</div>
    </main>
  );
}

export default PassengerLayout;
