import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'TODO 앱',
  description: '오늘의 할 일을 관리하세요',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  )
}
