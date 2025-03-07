import FooterEtutor from "@/components/FooterEtutor";
import NavbarEtutor from "@/components/NavbarEtutor";
import AppProvider from "@/contexts/AppContext";
import ExamProvider from "@/contexts/ExamContext";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const font = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Quiz pro | Play quiz online",
  description: "Quiz playing app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn("bg-blue-50", font.className)}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
          limit={4}
          transition={Slide}
        />
        <AppProvider>
          <ExamProvider>
            {/* <TimerProvider>
            <ScoreProvider>
            <QuizProvider> */}
            {/* <Navbar /> */}
            <NavbarEtutor />

            <div className=" max-w-[1200px] min-h-[90dvh] px-6 md:px-10 lg:px-12 xl:px-0 w-full mx-auto  text-black">
              {children}
            </div>

            <FooterEtutor />
            {/* </QuizProvider>
            </ScoreProvider>
            </TimerProvider> */}
          </ExamProvider>
        </AppProvider>
      </body>
    </html>
  );
}
