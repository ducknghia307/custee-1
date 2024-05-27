import Footer from "@/components/footer/Footer";
import { ForgotPasswordForm } from "@/components/forgotpassword/ForgotPassword";
import Navbar from "@/components/navbar/Navbar";

export default function ForgotPassword() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen pt-10 overflow-x-hidden">
      <Navbar/>
      <div className="flex-grow flex items-center justify-center">
        <ForgotPasswordForm />
      </div>
      <Footer/>
    </main>
  );
}
