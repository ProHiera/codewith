import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AntdLayout from "@/components/AntdLayout";

export const metadata: Metadata = {
  title: "CodeWith - AI 학습 파트너",
  description: "집에서 혼자 공부하는 당신을 위한 AI 학습 파트너",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <AntdRegistry>
          <AntdLayout>
            {children}
          </AntdLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
