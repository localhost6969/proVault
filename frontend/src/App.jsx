import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreateVault from "./components/CreateVault";
import CreateDeposit from "./components/CreateDeposit";
import Automate from "./components/Automate";
import DisplayVaults from "./components/DisplayVaults";
import NFTStore from "./components/NFTStore";
import Protected from "./components/Protected";

function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route
					path='/dashboard'
					element={
						<Protected>
							<Dashboard />
						</Protected>
					}
				/>
				<Route
					path='/create'
					element={
						<Protected>
							<CreateVault />
						</Protected>
					}
				/>
				<Route
					path='/deposit'
					element={
						<Protected>
							<CreateDeposit />
						</Protected>
					}
				/>
				<Route
					path='/automate'
					element={
						<Protected>
							<Automate />
						</Protected>
					}
				/>
				<Route path='/vaults' element={<DisplayVaults />} />
				<Route path='/store' element={<NFTStore />} />
			</Routes>
		</div>
	);
}

export default App;
