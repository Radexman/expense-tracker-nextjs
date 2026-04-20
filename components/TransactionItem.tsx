import { toast } from 'react-toastify';

import { type Transaction } from '@/types/transaction';
import { formatAmount } from '@/lib/utils';

type TransactionItemProps = {
	transaction: Transaction;
};

const TransactionItem = ({ transaction }: TransactionItemProps) => {
	const sign = transaction.amount < 0 ? '-' : '+';

	return (
		<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
			{transaction.text}
			<span>
				{sign}${formatAmount(Math.abs(transaction.amount))}
			</span>
		</li>
	);
};

export default TransactionItem;
