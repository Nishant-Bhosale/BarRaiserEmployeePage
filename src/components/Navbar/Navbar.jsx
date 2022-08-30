import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
	return (
		<div
			style={{
				position: "relative",
				display: "flex",
				justifyContent: "center",
				marginBlock: "2rem",
			}}
		>
			<NavLink to="/" activeclassname="active" className="link">
				Employee List
			</NavLink>
			<NavLink to="/hierarchy" activeclassname="active" className="link">
				Hierarchy
			</NavLink>
		</div>
	);
};

export default Navbar;
