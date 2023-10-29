import { Button, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import NavBar from "./Navbar";
import axios from "axios";
import { Radio, RadioGroup } from "@nextui-org/react";

const Automate = () => {
	const [intervalValue, setIntervalValue] = useState(10);

	const startApiCalls = () => {
		console.log(intervalValue, "intervalValue");
		console.log("Calling API...");
		// axios
		// 	.get(`http://localhost:3000/interval/${intervalValue}`)
		// 	.then(() => {
		// 		console.log("called APIs");
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	});
		console.log("Current time:", new Date().toLocaleTimeString());
	};

	const handleRadioChange = event => {
		setIntervalValue(event.target.value);
	};

	const stopApiCalls = () => {
		// clearInterval(timerId);
	};

	return (
		<>
			<div className='automate-page h-screen'>
				<NavBar />
				<div className='flex items-center justify-center h-3/4 mt-20'>
					<div className='bg-secondary-500 backdrop-blur-md bg-opacity-50 p-20 rounded-lg'>
						<label className='block text-5xl text-gray-200 font-bold mb-2'>
							Select your convenient interval
						</label>
						<p>
							Sei yethavathu sei Sollathathu sei Seiyaathathai sei Sei
							koodathathai sei Soodavathu sei Edagudam sei
						</p>
						<Input
							type='text'
							label='Vault Address'
							className='mt-10'
							color='secondary'
							variant='flat'
							radius='sm'
						></Input>
						<Input
							type='text'
							label='Amount'
							className='mt-10'
							color='secondary'
							variant='flat'
							radius='sm'
						></Input>
						<div className='flex items-center justify-center space-x-4 mt-10'>
							<label className='inline-flex items-center'>
								<input
									type='radio'
									className='form-radio text-blue-500'
									value='60'
									checked={intervalValue === "60"}
									onChange={handleRadioChange}
								/>
								<span className='ml-2'>1 month</span>
							</label>
							<label className='inline-flex items-center'>
								<input
									type='radio'
									className='form-radio text-blue-500'
									value='30'
									checked={intervalValue === "30"}
									onChange={handleRadioChange}
								/>
								<span className='ml-2'>1 week</span>
							</label>
							<label className='inline-flex items-center'>
								<input
									type='radio'
									className='form-radio text-blue-500'
									value='20'
									checked={intervalValue === "20"}
									onChange={handleRadioChange}
								/>
								<span className='ml-2'>1 day</span>
							</label>
						</div>
						<div className='flex items-center justify-center space-x-10 mt-10'>
							<Button size='lg' onClick={startApiCalls}>
								Start Automate
							</Button>
							<Button size='lg' onClick={stopApiCalls}>
								Stop Automate
							</Button>
							<Button size='lg' onClick={stopApiCalls}>
								Start Once
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Automate;
