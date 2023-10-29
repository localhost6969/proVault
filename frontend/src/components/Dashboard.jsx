import { useState, useEffect } from "react";
import {
	Card,
	CardFooter,
	Image,
	Button,
	Input,
	Link,
	Switch,
} from "@nextui-org/react";
import Loading from "./Loading";
import Popup from "reactjs-popup";
import { Spinner } from "@nextui-org/react";
import { AiFillCloseCircle } from "react-icons/ai";

import NavBar from "./Navbar";
import { useAddress, useContract, useSDK } from "@thirdweb-dev/react";
import CreateVault from "./CreateVault";
import { RiBankLine, RiCoinsFill } from "react-icons/ri";
import { PiVaultFill } from "react-icons/pi";
import { getVault, getBalance } from "../utils/vaults";
import { getAllAssets, addAsset } from "../utils/assets";

const { VITE_CONTRACT_ADDRESS } = import.meta.env;

const Dashboard = () => {
	const deposit = () => {
		alert("Deposited");
	};
	const { contract, isLoading, error } = useContract(VITE_CONTRACT_ADDRESS);
	const [loading, setLoading] = useState(true);
	const [loadingAssets, setLoadingAssets] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [selected, setSelected] = useState(false);
	const [vault, setVautAddress] = useState();
	const address = useAddress();
	const [assets, setAssets] = useState([]);
	const sdk = useSDK();
	useEffect(() => {
		if (address !== undefined && !isLoading) {
			getVault(sdk, address, contract)
				.then(res => {
					console.log("Get vault ", res);
					if (res.vaultAddress) {
						getAllAssets(sdk, res.vaultAddress)
							.then(res => {
								setAssets(res);
								console.log(res);
							})
							.catch(err => {
								console.error("Error getting assets", err);
							})
							.finally(() => {
								setLoadingAssets(false);
							});
						setVautAddress(res);
					}
				})
				.catch(err => {
					console.log(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [address, contract]);
	const addNewAsset = async form => {
		form.preventDefault();
		const assetAddress = form.target.assetAddress.value;
		const chainId = form.target.chainId.value;
		const res = await addAsset(sdk, assetAddress, chainId, vault.vaultAddress);
		console.log(res);
	};
	if (loading) {
		return <Loading />;
	}
	return (
		<>
			<div className='dashboard-page h-screen'>
				<NavBar />
				{openModal && (
					<div className='z-20 h-full w-full absolute flex backdrop-blur-md'>
						<div className='flex w-fit m-auto items-center justify-center relative'>
							<div className='absolute top-1 right-2 cursor-pointer'>
								<AiFillCloseCircle
									className='text-2xl text-red-500'
									onClick={() => setOpenModal(false)}
								/>
							</div>
							<div className='bg-gray-400 p-10 bg-opacity-70 rounded-md'>
								<Input
									type='text'
									label='Selling Price'
									className='text-white rounded-md'
									color='secondary'
									variant='flat'
									radius='sm'
									name='search'
								/>
								<Button className='w-full mt-5' color='primary'>
									Sell Subscription
								</Button>
							</div>
						</div>
					</div>
				)}
				<div className='mx-60'>
					<div className='flex items-center p-10'>
						{vault ? (
							<>
								{/* <p>
								Address : {vault.vaultAddress} : Role {vault.role}
							</p> */}
								<Card className='relative bg-secondary-500 backdrop-blur-md bg-opacity-50 p-10 rounded-md shadow-md h-50 w-50 flex flex-col'>
									<div className='flex items-center mb-4 justify-between'>
										<div className='flex'>
											<PiVaultFill className='text-4xl text-gray-100 mr-4' />
											<h2 className='text-xl font-bold text-white'>
												Role: {vault.role}
											</h2>
										</div>
										<div className='flex items-center justify-center'>
											<RiCoinsFill className='text-3xl text-green-500 mr-2' />
											<p className='text-green-500'>Funds: {vault.balance}</p>
										</div>
									</div>
									<p className='text-gray-400'>Vault Address</p>
									<p className='text-gray-300'>{vault.vaultAddress}</p>
								</Card>
							</>
						) : (
							<Button
								as={Link}
								href='/create'
								className='relative bg-opacity-70 backdrop-filter backdrop-blur-md bg-blue-500 p-10 rounded-md shadow-md m-5 cursor-pointer h-50 w-50 flex flex-col mb-[42rem]'
							>
								<div className='flex items-center mb-4'>
									<PiVaultFill className='text-4xl text-gray-100 mr-4' />
									<h2 className='text-2xl font-bold text-white'>
										Create Vault
									</h2>
								</div>
								<p className='text-gray-300'>Create a vault to deposit</p>
							</Button>
						)}
						{vault && (
							<Button
								as={Link}
								href='/deposit'
								className='relative bg-opacity-70 backdrop-filter backdrop-blur-md bg-blue-500 p-10 rounded-md shadow-md m-5 cursor-pointer h-[11.2rem] w-50 flex flex-col'
							>
								<div className='flex items-center mb-4'>
									<RiBankLine className='text-4xl text-gray-100 mr-4' />
									<h2 className='text-2xl font-bold text-white'>Deposit</h2>
								</div>
								<p className='text-gray-300'>
									Deposit your funds into your vault
								</p>
							</Button>
						)}
						<Card className='relative bg-green-500 backdrop-blur-md bg-opacity-50 p-10 rounded-md shadow-md h-50 w-50 flex flex-col h-[11.2rem]'>
							<div className='flex items-center justify-between'>
								<div>
									<div className=' flex justify-between '>
										<h2 className='text-md  text-white mr-10'>
											<span className='text-white font-bold  mr-1'>
												Subscription:
											</span>
											1
										</h2>
										<h2 className='flex items-center font-bold justify-center text-md  text-white'>
											<span className='text-white  mr-1'>Sell: </span>
											<Switch
												isSelected={selected}
												onValueChange={setSelected}
												onChange={() => {
													if (!selected) {
														setOpenModal(true);
													}
												}}
												color='success'
												size='sm'
											></Switch>
										</h2>
									</div>
									<div className='flex justify-between mt-2'>
										<p className='text-md  text-white mr-10'>
											<span className='text-white font-bold mr-1'>Start: </span>
											1/1/2021
										</p>
										<p className='text-md  text-white'>
											<span className='text-white font-bold  mr-1'>End: </span>
											1/1/2022
										</p>
									</div>
									<Button className='w-full mt-2'>Redeem</Button>
								</div>
							</div>
						</Card>
						<Card className='relative bg-green-500 backdrop-blur-md bg-opacity-50 p-5 rounded-md shadow-md h-50 w-50 flex flex-col h-[11.2rem]'>
							<div className='flex items-center justify-between'>
								<div>
									<div className=' flex items-center justify-center mb-3 '>
										<h2 className='text-2xl font-bold  text-white '>
											Buy NFT Subscription
										</h2>
										<p className='text-white'>Total price: 500</p>
									</div>
									<Button className='w-full'>Buy Subscription</Button>
								</div>
							</div>
						</Card>
					</div>

					{vault && (
						<div className='flex flex-col items-center h-3/4 bg-opacity-60 bg-white shadow-md rounded-xl p-8 overflow-y-auto max-h-full cards-container mt-20'>
							<div className='flex items-center justify-between mb-4'>
								<form className='flex space-x-4' onSubmit={addNewAsset}>
									<Input
										type='text'
										label='Asset address'
										className='text-white rounded-md'
										color='secondary'
										variant='flat'
										radius='sm'
										name='assetAddress'
									/>
									<Input
										type='text'
										label='Chain id'
										className='text-white rounded-md'
										color='secondary'
										variant='flat'
										radius='sm'
										name='chainId'
									/>
									<Button
										// className='text-black text-tiny bg-black/20'
										variant='flat'
										color='secondary'
										radius='sm'
										size='lg'
										border='secondary'
										type='submit'
									>
										Add asset
									</Button>
								</form>
							</div>
							{loadingAssets && (
								<div className='flex items-center justify-center p-10 h-full'>
									<Spinner size='lg' />
									<h1 className='text-5xl ml-5'>Loading</h1>
								</div>
							)}
							{assets.length === 0 && loadingAssets == false && (
								<div className='flex items-center justify-center w-full h-full'>
									<h1 className='text-2xl font-bold text-gray-500'>
										No assets to show
									</h1>
								</div>
							)}
							{assets.map((item, index) => (
								<div
									key={index}
									className='bg-white p-6 mb-4 rounded-md shadow-md w-full'
								>
									{/* Card content goes here */}
									<h2 className='text-2xl font-bold mb-1 text-secondary-500'>
										{item.assetAddress}
									</h2>
									<p className='text-gray-700'>{item.walletBalance}</p>
									<p className='text-gray-700'>{item.networkName}</p>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default Dashboard;
