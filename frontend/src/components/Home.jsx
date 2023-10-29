import React from "react";
import NavBar from "./Navbar";
import { Button } from "@nextui-org/react";
import { SiVaultwarden } from "react-icons/si";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div className='home-page h-screen'>
			<NavBar />
			<div className='flex items-center justify-center h-full text-white'>
				<div>
					<div className='flex items-center justify-center'>
						<h1 className='text-8xl font-bold mb-4'>Democrat</h1>
						<SiVaultwarden className='text-8xl mb-4' />
						<h1 className='text-8xl font-bold mb-4'>ault</h1>
					</div>
					<div className='flex items-center justify-center'>
						<p className='flex text-xl mb-8'>
							Trustless technology meets asset distribution: Welcome to the
							future of self-governing reserves.
						</p>
					</div>
					<div className='flex space-x-4 items-center justify-center'>
						<Link to='/login'>
							<Button className='bg-white text-blue-500 px-6 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition duration-300'>
								Get Started
							</Button>
						</Link>
						<Button
							variant='ghost'
							color='primary'
							className='border border-white px-6 py-3 rounded-full font-bold text-white hover:text-blue-500'
						>
							Learn More
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
