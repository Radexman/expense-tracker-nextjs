import getUserBalance from '@/app/actions/getUserBalance';
import { formatAmount } from '@/lib/utils';

const Balance = async () => {
	const result = await getUserBalance();

	if ('error' in result) {
		return <h1>Error: {result.error}</h1>;
	}

	return (
		<>
			<h4>Your Balance</h4>
			<h1>$ {formatAmount(Number(result.balance.toFixed(2)))}</h1>
		</>
	);
};

export default Balance;
