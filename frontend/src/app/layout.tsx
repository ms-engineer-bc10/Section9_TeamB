import type { Metadata } from "next";
import "@/styles/globals.css";
import AutoLogout from "@/components/AutoLogout";
import BrowserCloseLogout from "@/components/BrowserCloseLogout";

export const metadata: Metadata = {
  title: "Tellry",
  description:
    "養子縁組やステップファミリーのお子さまをもつお父さん、お母さん向けの真実告知ができるオリジナル絵本サービス",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <AutoLogout />
        <BrowserCloseLogout />
        {children}
      </body>
    </html>
  );
}
