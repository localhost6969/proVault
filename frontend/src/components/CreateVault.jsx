import { Button, Input } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import { Link, Navigate } from "react-router-dom";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { createVault } from "../utils/vaults";
import confetti from 'canvas-confetti';
import VaultFactoryAbi from '../artifacts/contracts/VaultFactory.sol/VaultFactory.json'

const { VITE_CONTRACT_ADDRESS, VITE_SPECIAL_WALLET_ADDRESS } = import.meta.env;
const CreateVault = () => {
	const address = useAddress();
	const [navigate, setNavigate] = useState(false);
	const [loadingVault, setLoadingVault] = useState(false);
	const { contract, isLoading, error } = useContract('0x582229194E67c13134b541Abdc02ED86956FEdC0', VaultFactoryAbi);
	const clickToCreate = async form => {
		try {
			form.preventDefault();
			const fundAddress = form.target.fundAddress.value;
			const devAddress = form.target.devAddress.value;
			const orgName = form.target.orgName.value;
			console.log(fundAddress, devAddress);
			const res = await createVault(
				contract,
				address,
				fundAddress,
				devAddress,
				VITE_SPECIAL_WALLET_ADDRESS,
				orgName
			);
			console.log("res : ", res);
			alert("Vault Created");
			setNavigate(true);
		} catch (err) {
			console.log(err);
		}
	};
	
	return (
		<>
			{navigate && <Navigate to='/dashboard' replace />}
			<div className='createvault-page h-screen'>
				<div className='p-20'>
					<form
						className='bg-secondary-500 p-10 backdrop-blur-md bg-opacity-70 rounded-xl'
						onSubmit={clickToCreate}
					>
						<div className='mt-4 mb-4 '>
							<div className='flex items-center'>
								<Link to='/dashboard'>
									<IoArrowBack className='text-3xl text-white mr-4 bg-secondary-800 rounded-full p-1' />
								</Link>
								<h1 className='text-3xl text-white '>Create Vault</h1>
							</div>
							<p className='mb-10 text-sm'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
							<div className='flex flex-wrap w-full gap-4 md:flex-nowrap'>
								<Input
									type='text'
									label='Fund address'
									className='text-white rounded-md'
									color='primary'
									variant='flat'
									radius='sm'
									name='fundAddress'
								/>
							</div>
						</div>
						<div className='mb-4 mt-4'>
							<div className='flex flex-wrap w-full gap-4 md:flex-nowrap'>
								<Input
									type='text'
									label='Developer address'
									className='text-white rounded-md'
									color='primary'
									variant='flat'
									radius='sm'
									name='devAddress'
								/>
							</div>
						</div>
						<div className='mb-6'>
							<div className='flex flex-wrap w-full gap-4 md:flex-nowrap'>
								<Input
									type='text'
									label='Organization Name'
									className='text-white rounded-md'
									color='primary'
									variant='flat'
									radius='sm'
									name='orgName'
								/>
							</div>
						</div>
						
						<Button
							variant='solid'
							color='success'
							radius='sm'
							size='lg'
							type='submit'

						>
							Create Vault
						</Button>
					</form>
				</div>
			</div>
		</>
	);
};

export default CreateVault;
