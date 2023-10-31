import { Button, Input, Spinner } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import { Link, Navigate } from "react-router-dom";
import {
	useAddress,
	useContract,
	Web3Button,
	useContractWrite,
	useSDK,
} from "@thirdweb-dev/react";
import { getVault } from "../utils/vaults";
import { useState, useEffect } from "react";
import VaultAbi from "../artifacts/contracts/Vault.sol/Vault.json";
import Loading from "./Loading";
import confetti from 'canvas-confetti';
import VaultFactoryAbi from '../artifacts/contracts/VaultFactory.sol/VaultFactory.json'



const CreateDeposit = () => {
	const { contract, isLoading, error } = useContract('0x582229194E67c13134b541Abdc02ED86956FEdC0', VaultFactoryAbi.abi);
	const [vaultAddress, setVautAddress] = useState();
	const [loading, setLoading] = useState(true);
	const [loadingTransaction, setLoadingTransaction] = useState(false);
	const [depositAmount, setDeposit] = useState(0.0);
	const address = useAddress();
	const sdk = useSDK();
	useEffect(() => {
		if (address !== undefined && !isLoading) {
			getVault(sdk, address, contract)
				.then(res => {
					console.log("Get vault ", res);
					if (res.vaultAddress) {
						setVautAddress(res.vaultAddress);
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
	if (loading) {
		return <Loading />;
	}
	return (
		<>
			<div className='createvault-page flex justify-center items-center h-screen'>
				<div className='p-20 '>
					<div className='bg-secondary-500 m-auto p-10 backdrop-blur-md w-fit bg-opacity-70 rounded-xl'>
						{vaultAddress && (
							<div className='mt-4 mb-4 '>
								<div className='flex items-center'>
									<Link to='/dashboard'>
										<IoArrowBack className='text-3xl text-white mr-4 bg-secondary-800 rounded-full p-1' />
									</Link>
									<h1 className='text-3xl text-white '>Create Deposit</h1>
								</div>
								<p className='mb-10 text-sm'>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</p>
								<div className='flex flex-wrap w-full gap-4 md:flex-nowrap'>
									<Input
										type='text'
										label='Amount'
										className='text-white rounded-md'
										color='primary'
										variant='flat'
										radius='sm'
										name='fundAddress'
										onChange={e => setDeposit(e.target.value)}
										defaultValue='0.0'
									/>
								</div>
								{loadingTransaction ? (
									<Spinner color='success' size='lg' className='mt-3' />
								) : (
									<div className='mt-4'>
										<TransactionButton
											setLoadingTransaction={setLoadingTransaction}
											loadingTransaction={loadingTransaction}
											vaultAddress={vaultAddress}
											amount={depositAmount}
										/>
									</div>
								)}
							</div>
						)}
						{/* <Button
						variant='flat'
						color='default'
						radius='sm'
						size='lg'
						border='default'
						type='submit'
					>
						Create Vault
					</Button> */}
					</div>
				</div>
			</div>
		</>
	);
};

function TransactionButton(props) {
	const handleConfetti = () => {
		confetti();
	}
	const sdk = useSDK();
	const initiateTransfer = () => {
		props.setLoadingTransaction(true); 
		const result = sdk.wallet
			.transfer(props.vaultAddress, props.amount)
			.then(res => {
				props.setResult(true);
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				props.setLoadingTransaction(false);
			});
	};
	console.log(props.vaultAddress);
	return (
		<>
		{props.result && <div>{handleConfetti()}</div>}
		<Button
			size='lg'
			variant='solid'
			color='success'
			onClick={initiateTransfer}
			type='button'
		>
			Send Transaction
		</Button>
		</>
	);
}

export default CreateDeposit;
