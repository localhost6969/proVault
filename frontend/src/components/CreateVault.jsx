import { Input } from "@nextui-org/react";

const CreateVault = () => {
	return (
		<>
			<div className='p-20'>
				<div className='mt-4 mb-4'>
					<h1>Provide your inputs</h1>
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
			</div>
		</>
	);
};

export default CreateVault;
