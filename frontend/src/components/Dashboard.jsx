import { useState } from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import NavBar from "./Navbar";
import { useAddress } from "@thirdweb-dev/react";

const Dashboard = () => {
	const createVault = () => {
		setCreatedVault(true);
	};

	const deposit = () => {
		alert("Deposited");
	};

	const [createdVault, setCreatedVault] = useState(false);
	const address = useAddress();
	console.log(address);
	return (
		<>
			<NavBar />
			<div className='flex items-center justify-center'>
				{createdVault ? (
					<Card isFooterBlurred radius='lg' className='border-none'>
						<Image
							alt='Woman listing to music'
							className='object-cover'
							height={200}
							src='https://avatars.githubusercontent.com/u/74228037?v=4'
							width={200}
						/>
						<Button
							className='text-black text-tiny bg-black/20'
							variant='flat'
							color='default'
							radius='md'
							size='sm'
							onClick={() => deposit()}
						>
							Deposit
						</Button>
					</Card>
				) : (
					<Card isFooterBlurred radius='lg' className='border-none'>
						<Image
							alt='Woman listing to music'
							className='object-cover'
							height={200}
							src='https://avatars.githubusercontent.com/u/74228037?v=4'
							width={200}
						/>
						<Button
							className='text-black text-tiny bg-black/20'
							variant='flat'
							color='default'
							radius='md'
							size='sm'
							onClick={() => createVault()}
						>
							Create Vault
						</Button>
					</Card>
				)}
				<h1>{address}</h1>
			</div>
		</>
	);
};

export default Dashboard;
