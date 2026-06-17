import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'GrowscaleX | Cosmetic Dental Marketing',
  description: 'Fill Your Calendar With Cosmetic Dental Patients. Only Pay When They Show Up.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`scroll-smooth ${poppins.variable}`}>
      <body className="font-sans antialiased text-[#010101] bg-white selection:bg-[#2F6FE5] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
