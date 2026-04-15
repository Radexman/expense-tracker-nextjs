'use server';

import { auth } from '@clerk/nextjs/server';

import { prisma } from '@/lib/prisma';

type UserBalanceResult = { balance: number } | { error: string };

async function getUserBalance(): Promise<UserBalanceResult> {
	const session = await auth();
	const userId = session.userId;

	if (!userId) {
		return { error: 'User not found' };
	}

	try {
		const result = await prisma.transaction.aggregate({
			where: { userId },
			_sum: { amount: true },
		});

		return { balance: result._sum.amount ?? 0 };
	} catch (error) {
		return { error: 'Database error' };
	}
}

export default getUserBalance;
