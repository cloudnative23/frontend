import Navbar from "@/components/Navbar";

function DriverLayout({ children }) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="container mx-auto flex h-mobile w-mobile flex-col overflow-hidden bg-driver">
      {/* <nav className="flex h-16 w-full pb-10"> */}
      <Navbar mode="driver" />
      {/* </nav> */}
      <div className="h-full w-full overflow-hidden overflow-y-auto">
        {children}
      </div>
    </main>
  );
}

export default DriverLayout;
