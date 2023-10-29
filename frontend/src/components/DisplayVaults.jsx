import { Card } from "@nextui-org/react";
import { RiBankLine, RiCoinsFill } from "react-icons/ri";
import { PiVaultFill } from "react-icons/pi";
import NavBar from "./Navbar";
import { useEffect, useState } from "react";
import { getAllVaults } from "../utils/vaults";
import { useSDK } from "@thirdweb-dev/react";
import Loading from "./Loading";
import { BiCopy } from "react-icons/bi";

const truncateMiddle = (str, startLength = 8, endLength = 4) => {
	if (str.length <= startLength + endLength) {
		return str;
	}

	const start = str.slice(0, startLength);
	const end = str.slice(-endLength);

	return `${start}....${end}`;
};

const DisplayVaults = () => {
	const [vaults, setVaults] = useState([]);
	const [loading, setLoading] = useState(true);
	const sdk = useSDK();
	useEffect(() => {
		if (sdk)
			getAllVaults(sdk)
				.then(res => {
					setVaults(res);
				})
				.catch(err => {
					console.log("Error in fetching all vaults: ", err);
				})
				.finally(() => {
					setLoading(false);
				});
	}, [sdk]);
	if (loading) {
		return <Loading />;
	}
	return (
		<>
			<div className='displayvaults-page h-full'>
				<NavBar />
				<div className=' px-60 py-20'>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-1 mb-[40rem]'>
						{vaults.map(vault => (
							<Card className='relative bg-secondary-500 backdrop-blur-md bg-opacity-50 p-10 rounded-md shadow-md m-5 h-50 w-50 flex flex-col  cursor-pointer'>
								<div className='flex items-center mb-4 justify-between'>
									<div className='flex'>
										<PiVaultFill className='text-4xl text-gray-100 mr-4' />
										<h2 className='text-2xl font-bold text-white'>
											{vault.orgName}
										</h2>
									</div>
									<div className='flex items-center justify-center'>
										<RiCoinsFill className='text-3xl text-green-500 mr-2' />
										<p className='text-green-500'>TVL:</p>
										<p className='text-green-500'>{vault.walletBalance}</p>
									</div>
								</div>
								{/* <p className='text-gray-400'>Vault Address</p> */}
								<div className='flex items-center'>
									<p className='text-gray-300'>
										{truncateMiddle(vault.vaultAddress)}
									</p>
									<BiCopy
										onClick={() => {
											navigator.clipboard.writeText(vault.vaultAddress);
										}}
										className=' text-gray-300 ml-2 cursor-pointer'
									/>
								</div>
							</Card>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default DisplayVaults;
