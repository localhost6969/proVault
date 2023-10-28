import React from "react";
import NavBar from "./Navbar";
import { addAsset } from "../utils/assets";
import { useAddress, useContract } from '@thirdweb-dev/react';
import { loggedIn } from "../auth/auth.mjs";
// import { isLoggedIn } from "../auth/auth.mjs";
function Home() {

	
	return (
		<div>
			<NavBar />
			<div>
				<h1 className='text-sm text-gray-500' onClick={() => loggedIn()}>This is home</h1>
			</div>
		</div>
	);
}

export default Home;
