import './globals.css'

export const metadata = {
  title: 'TODO 앱',
  description: '오늘의 할 일을 관리하세요',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
