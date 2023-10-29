import { Button, Card } from "@nextui-org/react";
import { RiBankLine, RiCoinsFill } from "react-icons/ri";
import { PiVaultFill } from "react-icons/pi";
import NavBar from "./Navbar";
const NFTStore = () => {
	const cardData = [
		{
			id: 1,
			subscription: "1",
			ownerAddress: "0xabcd1234ef56789ghijklmnopqrstuvwxy9876z543",
			price: "0.5",
			royalty: "0.1",
			start: "2021-09-01",
			end: "2021-10-01",
			total: "100",
		},
		{
			id: 2,
			subscription: "2",
			ownerAddress: "0xabcd1234ef56789ghijklmnopqrstuvwxy9876z543",
			price: "0.7",
			royalty: "0.15",
			start: "2021-10-01",
			end: "2021-11-01",
			total: "200",
		},
		{
			id: 3,
			subscription: "3",
			ownerAddress: "0xwxyz5678ef56789ghijklmnopqrstuvwxy9876z543",
			price: "1.0",
			royalty: "0.2",
			start: "2021-11-01",
			end: "2021-12-01",
			total: "150",
		},
		{
			id: 4,
			subscription: "4",
			ownerAddress: "0xwxyz5678ef56789ghijklmnopqrstuvwxy9876z543",
			price: "1.5",
			royalty: "0.25",
			start: "2021-12-01",
			end: "2022-01-01",
			total: "120",
		},
		{
			id: 5,
			subscription: "5",
			ownerAddress: "0xfghijklmno6789ghijklmnopqrstuvwxy9876z543",
			price: "2.0",
			royalty: "0.3",
			start: "2022-01-01",
			end: "2022-02-01",
			total: "180",
		},
		{
			id: 6,
			subscription: "6",
			ownerAddress: "0xmnopqrstuv56789ghijklmnopqrstuvwxy9876z543",
			price: "2.5",
			royalty: "0.35",
			start: "2022-02-01",
			end: "2022-03-01",
			total: "160",
		},
	];

	return (
		<>
			<div className='displayvaults-page h-full'>
				<NavBar />
				<div className=' px-60 py-20'>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-1 mb-[40rem]'>
						{cardData.map(card => (
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
