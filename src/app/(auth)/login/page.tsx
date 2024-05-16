import Footer from "@/components/footer/Footer";
import { SigninForm } from "@/components/login/Login";
import Navbar from "@/components/navbar/Navbar";

export default function SignInRoute() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen pt-10 overflow-x-hidden">
      <Navbar/>
      <div className="flex-grow flex items-center justify-center">
        <SigninForm />
      </div>
      <Footer/>
    </main>
  );
}
