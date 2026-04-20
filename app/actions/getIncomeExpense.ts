'use server';

import { auth } from '@clerk/nextjs/server';

import { prisma } from '@/lib/prisma';

type IncomeExpenseResult = {
	income?: number;
	expense?: number;
	error?: string;
};

async function getIncomeExpense(): Promise<IncomeExpenseResult> {
	const session = await auth();
	const userId = session.userId;

	if (!userId) {
		return { error: 'User not found' };
	}

	try {
		const transactions = await prisma.transaction.findMany({ where: { userId } });

		const amounts = transactions.map((transaction) => transaction.amount);

		const income = amounts.filter((item) => item > 0).reduce((acc, item) => acc + item, 0);
		const expense = amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0);

		return { income, expense: Math.abs(expense) };
	} catch (error) {
		return { error: 'Database error' };
	}
}

export default getIncomeExpense;
