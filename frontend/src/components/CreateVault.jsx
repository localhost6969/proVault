import { Button, Input } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const CreateVault = () => {
	return (
		<>
			<div className='createvault-page h-screen'>
				<div className='p-20'>
					<div className='bg-secondary-500 p-10 backdrop-blur-md bg-opacity-70 rounded-xl'>
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
								/>
							</div>
						</div>
						<Button
							variant='flat'
							color='default'
							radius='sm'
							size='lg'
							border='default'
						>
							Create Vault
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateVault;
