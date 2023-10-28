import { useState, useEffect } from "react";
import {
	Card,
	CardFooter,
	Image,
	Button,
	Input,
	Link,
} from "@nextui-org/react";
import NavBar from "./Navbar";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { createVault } from "../utils/createVault";
import { RiBankLine } from "react-icons/ri";
import { PiVaultFill } from "react-icons/pi";

// Example usage
const cardData = [
	{ title: "Card 1", description: "Description for Card 1" },
	{ title: "Card 2", description: "Description for Card 2" },
	{ title: "Card 3", description: "Description for Card 3" },
	{ title: "Card 4", description: "Description for Card 4" },
];

const Dashboard = () => {
	const createVault = () => {
		setCreatedVault(true);
	};

	const deposit = () => {
		alert("Deposited");
	};

	const [createdVault, setCreatedVault] = useState(false);
	const address = useAddress();
	const { contract, isLoading } = useContract();

	useEffect(() => {
		if (address !== undefined && !isLoading) {
			// getVault(address, contract);
		}
	}, [address, contract]);
	console.log(address);
	return (
		<>
			<div className='dashboard-page'>
				<NavBar />
				<div className='flex items-center p-10 ml-40'>
					<Link href='/create'>
						<Button className='relative bg-opacity-70 backdrop-filter backdrop-blur-md bg-blue-500 p-10 rounded-md shadow-md m-5 cursor-pointer h-50 w-50 flex flex-col'>
							<div className='flex items-center mb-4'>
								<PiVaultFill className='text-4xl text-gray-100 mr-4' />
								<h2 className='text-2xl font-bold text-white'>Create Vault</h2>
							</div>
							<p className='text-gray-300'>Create a vault to deposit</p>
						</Button>
					</Link>
					<Button className='relative bg-opacity-70 backdrop-filter backdrop-blur-md bg-blue-500 p-10 rounded-md shadow-md m-5 cursor-pointer h-50 w-50 flex flex-col'>
						<div className='flex items-center mb-4'>
							<RiBankLine className='text-4xl text-gray-100 mr-4' />
							<h2 className='text-2xl font-bold text-white'>Deposit</h2>
						</div>
						<p className='text-gray-300'>Deposit your funds into your vault</p>
					</Button>
				</div>
				<div className='flex flex-col items-center w-3/4  h-3/4 bg-opacity-60 bg-white shadow-md rounded-xl p-8 ml-40 overflow-y-auto max-h-full cards-container mt-20'>
					<div className='flex items-center justify-between mb-4'>
						<div className='flex space-x-4'>
							<Input
								type='text'
								label='Asset id'
								className='text-white rounded-md'
								color='secondary'
								variant='flat'
								radius='sm'
							/>
							<Input
								type='text'
								label='Chain id'
								className='text-white rounded-md'
								color='secondary'
								variant='flat'
								radius='sm'
							/>
							<Button
								// className='text-black text-tiny bg-black/20'
								variant='flat'
								color='secondary'
								radius='sm'
								size='lg'
								border='secondary'
							>
								Add asset
							</Button>
						</div>
					</div>
					{cardData.length === 0 && (
						<div className='flex items-center justify-center w-full h-full'>
							<h1 className='text-2xl font-bold text-gray-500'>
								No assets to show
							</h1>
						</div>
					)}
					{cardData.map((item, index) => (
						<div
							key={index}
							className='bg-white p-6 mb-4 rounded-md shadow-md w-full'
						>
							{/* Card content goes here */}
							<h2 className='text-2xl font-bold mb-1 text-secondary-500'>
								{item.title}
							</h2>
							<p className='text-gray-700'>{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
// <div className='flex items-center justify-center'>
// 	{createdVault ? (
// 		<Card isFooterBlurred radius='lg' className='border-none'>
// 			<Image
// 				alt='Woman listing to music'
// 				className='object-cover'
// 				height={200}
// 				src='https://avatars.githubusercontent.com/u/74228037?v=4'
// 				width={200}
// 			/>
// 			<Button
// 				className='text-black text-tiny bg-black/20'
// 				variant='flat'
// 				color='default'
// 				radius='md'
// 				size='sm'
// 				onClick={() => deposit()}
// 			>
// 				Deposit
// 			</Button>
// 		</Card>
// 	) : (
// 		<Card isFooterBlurred radius='lg' className='border-none'>
// 			<Image
// 				alt='Woman listing to music'
// 				className='object-cover'
// 				height={200}
// 				src='https://avatars.githubusercontent.com/u/74228037?v=4'
// 				width={200}
// 			/>
// 			<Button
// 				className='text-black text-tiny bg-black/20'
// 				variant='flat'
// 				color='default'
// 				radius='md'
// 				size='sm'
// 				onClick={() => createVault()}
// 			>
// 				Create Vault
// 			</Button>
// 		</Card>
// 	)}
// 	<h1>{address}</h1>
// </div>

export default Dashboard;
