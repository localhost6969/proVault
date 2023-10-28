import { Button, Input } from "@nextui-org/react";

const CreateVault = () => {
	return (
		<>
			<div className='p-20 my-20'>
				<div className='bg-secondary-500 p-10 backdrop-blur-md bg-opacity-70 rounded-xl'>
					<div className='mt-4 mb-4'>
						<h1 className='text-3xl text-white '>Create Vault</h1>
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
		</>
	);
};

export default CreateVault;
