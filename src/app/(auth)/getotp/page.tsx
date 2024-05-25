import Footer from "@/components/footer/Footer";
import { GetOTPForm } from "@/components/getotp/GetOTP";
import Navbar from "@/components/navbar/Navbar";

export default function GetOTP() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen pt-10 overflow-x-hidden">
      <Navbar/>
      <div className="flex-grow flex items-center justify-center">
        <GetOTPForm />
      </div>
      <Footer/>
    </main>
  );
}
