import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: '아무거나',
  description: 'Whatever you want',
  icons: {
		icon: "/logo-pin-1.svg",
	},
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const pretendard = localFont({
  src: '../../public/Font/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900', // 다양한 weight 설정
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kr'>
      <body className={pretendard.className}>  
        {children}
      </body>
    </html>
  );
}
