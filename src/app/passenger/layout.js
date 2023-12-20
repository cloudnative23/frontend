import Navbar from "@/components/Navbar";

function PassengerLayout({ children }) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="container mx-auto flex h-mobile w-mobile flex-col overflow-hidden bg-passenger">
      {/* <nav className="flex h-16 w-full pb-10"> */}
      <Navbar mode="passenger" />
      {/* </nav> */}
      <div className="h-full w-full  overflow-hidden">{children}</div>
    </main>
  );
}

export default PassengerLayout;
