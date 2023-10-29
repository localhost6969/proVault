import { Button, Card } from "@nextui-org/react";
import { RiBankLine, RiCoinsFill } from "react-icons/ri";
import { PiVaultFill } from "react-icons/pi";
import { useSDK } from "@thirdweb-dev/react";
import { getAllSellingSubscriptions } from "../utils/subscription";
import { useState, useEffect } from "react";
import NavBar from "./Navbar";
import Loading from "./Loading";

const NFTStore = () => {
	const [subs, setSubs] = useState([]);
	const [loading, setLoading] = useState(true);
	const sdk = useSDK();
	useEffect(() => {
		if (sdk)
			getAllSellingSubscriptions(sdk)
				.then(res => {
					console.log("All subscriptions: ", res);
					setSubs(res);
					console.log("All subscriptions: ", subs);
				})
				.catch(err => {
					console.log("Error in fetching all subscriptions: ", err);
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
						{subs.map(card => (
							<Card className='relative bg-gray-600 backdrop-blur-md bg-opacity-50 p-10 rounded-md shadow-md m-5 h-50 w-50 flex flex-col  cursor-pointer'>
								{/* <div className='flex items-center mb-4 justify-between'> */}
								<div>
									<div className='px-4 flex justify-between  bg-white p-1 rounded-md mb-3'>
										<h2 className='text-md font-bold text-gray-800'>
											<span className='text-gray-800 font-light'>
												Subscription:
											</span>
											#{card.subscription}
										</h2>
										<h2 className='text-md font-bold text-gray-800'>
											<span className='text-gray-800 font-light'>Total:</span>#
											{card.total}
										</h2>
									</div>
									<p className='text-md  text-white'>
										<span className='text-gray-400 font-light'>Price: </span>
										{card.price}
										<p className='text-md  text-white'>
											<span className='text-gray-400 font-light'>
												Address:{" "}
											</span>
											{card.ownerAddress}
										</p>
									</p>
									<p className='text-md  text-white'>
										<span className='text-gray-400 font-light'>Royalty: </span>
										{card.royalty}
									</p>
									<div className='flex justify-between'>
										<p className='text-md  text-white'>
											<span className='text-gray-400 font-light'>Start: </span>
											{card.start}
										</p>
										<p className='text-md  text-white'>
											<span className='text-gray-400 font-light'>End: </span>
											{card.end}
										</p>
									</div>
								</div>
								<Button radius='sm' className='mt-3 bg-lime-400 bg-opacity-70'>
									Purchase
								</Button>
							</Card>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default NFTStore;
