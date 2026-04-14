import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Roboto } from 'next/font/google';

import './globals.css';
import Header from '@/components/Header';

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Expense Tracker',
	description: 'Track your expenses and create a budget',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className={`${roboto.variable}`}
		>
			<ClerkProvider>
				<body>
					<Header />
					<main className='container'>{children}</main>
				</body>
			</ClerkProvider>
		</html>
	);
}
