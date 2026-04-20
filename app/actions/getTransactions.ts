'use server';

import { auth } from '@clerk/nextjs/server';

import { prisma } from '@/lib/prisma';
import { type Transaction } from '@/types/transaction';

type TransactionsResult = {
	transactions?: Transaction[];
	error?: string;
};

async function getTransactions(): Promise<TransactionsResult> {
	const session = await auth();
	const userId = session.userId;

	if (!userId) {
		return { error: 'User not found' };
	}

	try {
		const transactions = await prisma.transaction.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });

		return { transactions };
	} catch (error) {
		return { error: 'Database error' };
	}
}

export default getTransactions;
