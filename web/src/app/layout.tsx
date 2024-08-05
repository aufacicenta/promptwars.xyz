import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { AuthorizationContextController } from "@/context/authorization/AuthorizationContextController";
import { UserCreditsContextController } from "@/context/user-credits/UserCreditsContextController";
import { RoundContextController } from "@/context/round/RoundContextController";
import { PromptContextController } from "@/context/prompt/PromptContextController";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prompt Wars",
  description: "Challenge AI prompt engineers worldwide.",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthorizationContextController>
          <UserCreditsContextController>
            <RoundContextController>
              <PromptContextController>
                <Navbar />

                <main>{children}</main>
              </PromptContextController>
            </RoundContextController>
          </UserCreditsContextController>
        </AuthorizationContextController>
      </body>
    </html>
  );
}

export default RootLayout;
