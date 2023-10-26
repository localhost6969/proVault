import React from "react";
import NavBar from "./Navbar";

function Home() {
	return (
		<div>
			<NavBar />
			<div>
				<h1 className='text-sm text-gray-500'>This is home</h1>
			</div>
		</div>
	);
}

export default Home;
