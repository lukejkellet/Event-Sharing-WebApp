import React from 'react';
import { Link as button } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
	return (
		<>
			<NavMenu>
				<Link to='/events'>
					Events
				</Link>
				<Link to='/settings'>
					Settings
				</Link>
        <Link to='/'>
					Sign Out
				</Link>
			</NavMenu>
		</>
	);
}

const Link = styled(button)`
  font-size:100%;
  font-family: arial;
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  &:hover{color: #f1f1f1};
`;
  
const NavMenu = styled.div`
  height: 100%; 
  width: 160px; 
  position: fixed; 
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;
  @media screen and (max-width: 768px) { display: none;}
`;

export default Navbar;