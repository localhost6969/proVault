import {
	ThirdwebProvider,
	ConnectWallet,
	metamaskWallet,
	coinbaseWallet,
	walletConnect,
	localWallet,
	embeddedWallet,
	useAddress,
} from "@thirdweb-dev/react";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { SiVaultwarden } from "react-icons/si";

export default function Login() {
	const address = useAddress();
	console.log(address);
	const [navigate, setNavigate] = useState(false);

	useEffect(() => {
		if (address !== undefined) {
			setNavigate(true);
		}
	}, [address]);

	return (
		<>
			{navigate && <Navigate to='/dashboard' />}
			<div className='login-page flex items-center justify-center h-screen'>
				<div className='absolute inset-0 bg-gradient-to-b from-gray-800 via-transparent to-gray-800 backdrop-blur-sm'></div>

				<div className='flex w-3/4 h-3/4'>
					{/* Left Side - Process Details */}
					<div className='flex flex-col items-center justify-center flex-1 p-10 bg-opacity-70 backdrop-filter backdrop-blur-md bg-white shadow-md rounded-l-xl'>
						<h1 className='mb-4 text-4xl font-bold text-secondary-600'>
							Login Process Details
						</h1>
						<p className='text-gray-700'>
							Provide your credentials to access the system. Lorem ipsum dolor
							sit amet, consectetur adipiscing elitx.
						</p>
					</div>

					{/* Right Side - Login Form */}
					<div className='flex items-center justify-center flex-1 bg-opacity-70 backdrop-filter backdrop-blur-md bg-secondary-400 rounded-r-xl'>
						<div className='w-96'>
							<div className='flex'>
								<h1 className='mb-5 text-5xl'>ProVault</h1>
								<SiVaultwarden className='text-6xl text-white ml-3' />
							</div>
							{/* Top - Button */}
							{/* Assuming ConnectWallet and Input components are appropriately defined */}
							<ConnectWallet
								theme={"dark"}
								modalSize={"wide"}
								className='w-full px-4 py-2 mb-8 rounded-md'
							/>

							{/* Inputs */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
