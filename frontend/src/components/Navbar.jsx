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
import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<NextUINavbar shouldHideOnScroll className='bg-gray-400'>
			<NavbarBrand>
				<h1 className='text-lg text-gray-800'>Pro Vault</h1>
			</NavbarBrand>
			<NavbarContent className='hidden sm:flex gsp-4' justify='center'>
				<NavbarItem>
					<Link color='foreground' to='/'>
						Pricing
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color='foreground' to='/'>
						Contact Us
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color='foreground' to='/dashboard'>
						Dashboard
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify='end'>
				<NavbarItem>
					<Link to='/login'>
						<button color='primary' variant='flat' className='bg-gray-500'>
							Join Now
						</button>
					</Link>
				</NavbarItem>
			</NavbarContent>
		</NextUINavbar>
	);
}
