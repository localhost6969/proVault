import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreateVault from "./components/CreateVault";
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
			</Routes>
		</div>
	);
}

export default App;
