import Navbar from "@/components/Navbar";
import AppProvider from "@/contexts/AppContext";
import ScoreProvider from "@/contexts/ScoreContext";
import { TimerProvider } from "@/contexts/TimerContext";
import { Poppins } from "next/font/google";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import QuizProvider from "@/contexts/QuizContext";

const font = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Quiz pro | Play quiz online",
  description: "Quiz playing app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
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
          <TimerProvider>
            <ScoreProvider>
              <QuizProvider>
                <Navbar />
                <div className=" w-11/12 max-w-screen-xl md:px-0 mx-auto text-black">
                  {children}
                </div>
              </QuizProvider>
            </ScoreProvider>
          </TimerProvider>
        </AppProvider>
      </body>
    </html>
  );
}
