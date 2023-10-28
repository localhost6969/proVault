import { Card } from "@nextui-org/react";
import { RiBankLine, RiCoinsFill } from "react-icons/ri";
import { PiVaultFill } from "react-icons/pi";
import NavBar from "./Navbar";
const DisplayVaults = () => {
	const cardData = [
		{ id: 1, title: "Card 1", content: "Content for Card 1" },
		{ id: 2, title: "Card 2", content: "Content for Card 2" },
		{ id: 3, title: "Card 3", content: "Content for Card 3" },
		{ id: 4, title: "Card 4", content: "Content for Card 4" },
		{ id: 1, title: "Card 1", content: "Content for Card 1" },
		{ id: 2, title: "Card 2", content: "Content for Card 2" },
		{ id: 3, title: "Card 3", content: "Content for Card 3" },
		{ id: 4, title: "Card 4", content: "Content for Card 4" },

		// Add more cards as needed
	];
	return (
		<>
			<div className='displayvaults-page h-full'>
				<NavBar />
				<div className=' px-60 py-20'>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-1'>
						{cardData.map(card => (
							<Card className='relative bg-secondary-500 backdrop-blur-md bg-opacity-50 p-10 rounded-md shadow-md m-5 h-50 w-50 flex flex-col  cursor-pointer'>
								<div className='flex items-center mb-4 justify-between'>
									<div className='flex'>
										<PiVaultFill className='text-4xl text-gray-100 mr-4' />
										<h2 className='text-2xl font-bold text-white'>
											{card.title}
										</h2>
									</div>
									<div className='flex items-center justify-center'>
										<RiCoinsFill className='text-3xl text-green-500 mr-2' />
										<p className='text-green-500'>{card.id}</p>
									</div>
								</div>
								{/* <p className='text-gray-400'>Vault Address</p> */}
								<p className='text-gray-300'>{card.content}</p>
							</Card>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default DisplayVaults;
