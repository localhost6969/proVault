import { Button, Input } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import { Link, Navigate } from "react-router-dom";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import {createVault} from '../utils/vaults';

const { VITE_CONTRACT_ADDRESS, VITE_SPECIAL_WALLET_ADDRESS} = import.meta.env;
const CreateVault = () => {
	const address = useAddress();
	const [navigate, setNavigate] = useState(false);
	const {contract, isLoading, error} = useContract(VITE_CONTRACT_ADDRESS);
	const clickToCreate = async (form)=>{
		try {
			form.preventDefault();
			const fundAddress = form.target.fundAddress.value;
			const devAddress = form.target.devAddress.value;
			console.log(fundAddress, devAddress);
			const res = await createVault(contract, address, fundAddress, devAddress, VITE_SPECIAL_WALLET_ADDRESS);
			console.log('res : ', res);
			alert("Vault Created");
			setNavigate(true);
		} catch (err) {

		}
		
	}
	return (
		<>
			{navigate && <Navigate to='/dashboard' replace/>}
			<div className='createvault-page h-screen'>
				
				<div className='p-20'>
					<form className='bg-secondary-500 p-10 backdrop-blur-md bg-opacity-70 rounded-xl' onSubmit={clickToCreate}>
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
									name="fundAddress"
								/>
							</div>
						</div>
						<div className='mb-6'>
							<div className='flex flex-wrap w-full gap-4 md:flex-nowrap'>
								<Input
									type='text'
									label='Developer address'
									className='text-white rounded-md'
									color='primary'
									variant='flat'
									radius='sm'
									name="devAddress"
								/>
							</div>
						</div>
						<Button
							variant='flat'
							color='default'
							radius='sm'
							size='lg'
							border='default'
							type="submit"
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
