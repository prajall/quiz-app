import { Inter, Open_Sans, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import QuizProvider from "@/contexts/QuizContext";
import { TimerProvider } from "@/contexts/TimerContext";
import ScoreProvider from "@/contexts/ScoreContext";
import Navbar from "@/components/Navbar";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppProvider from "@/contexts/AppContext";

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
