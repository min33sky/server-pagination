import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '서버 페이지네이션 영화 검색기',
  description: 'Movie Search App with Server Side Pagination',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableColorScheme
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
