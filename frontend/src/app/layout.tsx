import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
