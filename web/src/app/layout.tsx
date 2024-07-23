import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { IlluviumPassportContextController } from "@/context/illuvium-passport/IlluviumPassportContextController";
import { EvmWalletSelectorContextController } from "@/context/wallet-selector/EvmWalletSelectorContextController";
import { AuthorizationContextController } from "@/context/authorization/AuthorizationContextController";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prompt Wars",
  description: "Challenge AI prompt engineers worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthorizationContextController>
          <EvmWalletSelectorContextController>
            <IlluviumPassportContextController>
              <Navbar />

              <main>{children}</main>
            </IlluviumPassportContextController>
          </EvmWalletSelectorContextController>
        </AuthorizationContextController>
      </body>
    </html>
  );
}
