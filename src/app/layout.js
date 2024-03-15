import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vishnu Goswami - Full stack developer",
  description:
    "A talented full stack developer with experience in Next Js ( Primary ) React, Node.js, Express.js, MongoDB, AWS Lambda, AWS API Gateway and Digital Ocean. I am passionate about my work and am committed to delivering high-quality code. I am also a team player and am able to work effectively with others to achieve common goals. I am a valuable asset to any team.",
};

export default function RootLayout(props) {
  return (
    <>
      <html lang="en">
        <body
          className={`${inter.className} bg-black overflow-x-hidden scroll-up`}
        >
          <div className="fixed top-0 left-0 w-screen h-screen z-[-1]">
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover opacity-40"
            >
              <source
                src="/videos/compressed/backgroundVideo.mp4"
                type="video/mp4"
              />
              <source
                src="/videos/compressed/backgroundVideo.webm"
                type="video/webm"
              />
              <source
                src="/videos/compressed/backgroundVideo.avi"
                type="video/avi"
              />
              <source
                src="/videos/compressed/backgroundVideo.flv"
                type="video/flv"
              />
              <source
                src="/videos/compressed/backgroundVideo.mkv"
                type="video/mkv"
              />
              <source
                src="/videos/compressed/backgroundVideo.mov"
                type="video/mov"
              />
              <source
                src="/videos/compressed/backgroundVideo.wmv"
                type="video/wmv"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          {props.children}
        </body>
      </html>
    </>
  );
}
