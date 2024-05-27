import Footer from "@/components/footer/Footer";
import { ResetPasswordForm } from "@/components/resetpassword/ResetPassword";
import Navbar from "@/components/navbar/Navbar";

export default function ResetPassword() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen pt-10 overflow-x-hidden">
      <Navbar/>
      <div className="flex-grow flex items-center justify-center">
        <ResetPasswordForm />
      </div>
      <Footer/>
    </main>
  );
}
