'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

type DeleteTransactionResult = {
	message?: string;
	error?: string;
};

async function deleteTransaction(transactionId: string): Promise<DeleteTransactionResult> {
	const session = await auth();
	const userId = session.userId;

	if (!userId) {
		return { error: 'User not found' };
	}

	try {
		await prisma.transaction.delete({
			where: {
				id: transactionId,
				userId,
			},
		});

		revalidatePath('/');

		return { message: 'Transaction deleted' };
	} catch (error) {
		return { error: 'Database error' };
	}
}

export default deleteTransaction;
