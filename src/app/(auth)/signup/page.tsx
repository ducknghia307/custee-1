import { SignupForm } from "@/components/signup/Signup";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
export default function SignUpRoute() {
    return (
        <main className="flex flex-col items-center justify-between min-h-screen pt-10 overflow-x-hidden">
          <Navbar/>
          <div className="flex-grow flex items-center justify-center">
            <SignupForm />
          </div>
          <Footer/>
        </main>
      );
}