import { Spinner } from "@nextui-org/react";
import NavBar from "./Navbar";

const Loading = () => {
	return (
		<div className='dashboard-page h-screen'>
			<NavBar />
			<div className='flex items-center justify-center p-10 h-full'>
				<Spinner size='lg' />
				<h1 className='text-6xl ml-5'>Loading</h1>
			</div>
		</div>
	);
};

export default Loading;
