import { Button, Input, button } from "@nextui-org/react";
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
import VaultAbi from "../../../VaultFactory/artifacts/contracts/Vault.sol/Vault.json";
import Loading from "./Loading";

const { VITE_CONTRACT_ADDRESS } = import.meta.env;
const CreateDeposit = () => {
	const { contract, isLoading, error } = useContract(VITE_CONTRACT_ADDRESS);
	const [vaultAddress, setVautAddress] = useState();
	const [loading, setLoading] = useState(true);
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
			<div className='createvault-page h-screen'>
				<div className='p-20'>
					<div className='bg-secondary-500 p-10 backdrop-blur-md bg-opacity-70 rounded-xl'>
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
								<div className='mt-4'>
									<TransactionButton
										vaultAddress={vaultAddress}
										amount={depositAmount}
									/>
								</div>
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
	const sdk = useSDK();
	const initiateTransfer = async () => {
		const result = await sdk.wallet.transfer(props.vaultAddress, props.amount);
		console.log(result);
	};
	console.log(props.vaultAddress);
	return (
		<Button
			size='lg'
			variant='solid'
			color='success'
			onClick={initiateTransfer}
			type='button'
		>
			Send Transaction
		</Button>
	);
}

export default CreateDeposit;
