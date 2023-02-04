import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Noto_Sans_Mono } from "@next/font/google";

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin", "greek"],
  variable: "--font-noto-sans-mono",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${notoSansMono.variable} font-mono`}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
