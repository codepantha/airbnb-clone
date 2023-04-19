import { Nunito } from 'next/font/google';
import './globals.css';
import { ClientOnly, Modal, Navbar, RegisterModal } from './components';
import ToasterProvider from './providers/ToasterProvider';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone by codepantha'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
