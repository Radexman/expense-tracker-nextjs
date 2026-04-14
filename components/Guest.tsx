import { Show, SignInButton } from '@clerk/nextjs';

const Guest = () => {
	return (
		<div className='guest'>
			<h1>Welcome</h1>
			<p>Please sign in to manage your transactions</p>
			<Show when='signed-out'>
				<SignInButton />
			</Show>
		</div>
	);
};

export default Guest;
