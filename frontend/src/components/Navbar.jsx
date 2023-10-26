import { Navbar, NavbarContent, NavbarItem, NavbarBrand, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export default function NavBar () {
    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <h1>Pro Vault</h1>
            </NavbarBrand>
            <NavbarContent className='hidden sm:flex gsp-4' justify='center'>
                <NavbarItem>
                    <Link color="foreground" to='/'>
                    Pricing
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" to='/' >
                    Contact Us
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
                <NavbarItem>
                       <Link to="/login">
                            <button color='primary' variant='flat'>
                                Join Now
                            </button>
                       </Link> 
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}