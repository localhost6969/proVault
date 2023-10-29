import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarItem,
	NavbarBrand,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Button,
} from "@nextui-org/react";
import { useLogout, useAddress, ConnectWallet } from "@thirdweb-dev/react";
import { Link } from "react-router-dom";
import { SiVaultwarden } from "react-icons/si";
import { Navigate } from "react-router-dom";

export default function NavBar() {
	const { logout, isLoading } = useLogout();
	const address = useAddress();
	return (
		<NextUINavbar shouldHideOnScroll className='bg-gray-500 bg-opacity-50'>
			<NavbarBrand className='ml-20'>
				<Link to='/'>
					<SiVaultwarden className='text-4xl text-secondary-200 ml-3' />
				</Link>
				{/* <h1 className='text-2xl text-gray-800'>Pro Vault</h1> */}
			</NavbarBrand>
			<NavbarContent className='hidden sm:flex gsp-4 ml-20' justify='center'>
				<NavbarItem>
					<Link color='foreground' to='/dashboard'>
						Dashboard
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color='foreground' to='/automate'>
						Automate
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color='foreground' to='/vaults'>
						Vaults
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color='foreground' to='/store'>
						NFT Store
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify='end' className='ml-20'>
				{address ? (
					<>
						<NavbarItem>
							<ConnectWallet className='!h-10 !bg-transparent !border-0' />
						</NavbarItem>
						<NavbarItem>
							<Button
								variant='flat'
								className='bg-red-700 text-white'
								radius='sm'
								onClick={() => {
									localStorage.clear();
									window.location.href = "/";
								}}
							>
								Logout
							</Button>
						</NavbarItem>
					</>
				) : (
					<NavbarItem>
						<Link to='/login'>
							<Button variant='flat' className='bg-green-500' radius='sm'>
								Join Now
							</Button>
						</Link>
					</NavbarItem>
				)}
			</NavbarContent>
		</NextUINavbar>
	);
}
