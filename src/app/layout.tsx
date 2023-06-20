import "./globals.css";

import { Nunito } from "next/font/google";

import Navbar from "./components/Navbar";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/Modal/LoginModal";
import RegisterModal from "./components/Modal/RegisterModal";
import RentModal from "./components/Modal/RentModal";
import SearchModal from "./components/SearchModal";

import ToasterProvider from "./providers/ToasterProvider";

import getCurrentUser from "./actions/getCurrentUser";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Web App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
