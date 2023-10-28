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
import { useLogout, useAddress } from "@thirdweb-dev/react";
import { Link } from "react-router-dom";
import { SiVaultwarden } from "react-icons/si";
import { Navigate } from "react-router-dom";

export default function NavBar() {
	const { logout, isLoading } = useLogout();
	const address = useAddress();
	return (
		<NextUINavbar shouldHideOnScroll className='bg-gray-500 bg-opacity-50'>
			<NavbarBrand>
				<Link to='/'>
					<SiVaultwarden className='text-4xl text-secondary-200 ml-3' />
				</Link>
				{/* <h1 className='text-2xl text-gray-800'>Pro Vault</h1> */}
			</NavbarBrand>
			<NavbarContent className='hidden sm:flex gsp-4' justify='center'>
				<NavbarItem>
					<Link color='foreground' to='/'>
						Subscribe
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color='foreground' to='/dashboard'>
						Dashboard
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify='end'>
				{address ? (
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
