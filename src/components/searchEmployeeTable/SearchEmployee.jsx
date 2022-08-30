import React, { useState } from "react";
import {
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Box,
	Typography,
	Button,
} from "@mui/material";

const SearchEmployee = ({ input, search, designations, filterEmp, reset }) => {
	const [designation, setDesignation] = useState(designations[0]);

	const handleInput = (e) => {
		const { name, value } = e.target;

		search((prev) => ({
			...prev,
			[name]: value,
			des: designation,
		}));
	};

	const handleFilter = (e) => {
		filterEmp(e.target.value);
		setDesignation(e.target.value);
	};

	const resetDetails = () => {
		reset();
	};

	return (
		<>
			<Typography variant="h4" marginBottom="2rem" align="center">
				Search And Filter Employees
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-start",
					alignItems: "center",
					marginLeft: "2.05rem",
				}}
			>
				<TextField
					label="Name/Address/Id/DOB"
					variant="outlined"
					placeholder="Search By Employee Name Here..."
					type="search"
					name="name"
					onChange={handleInput}
					value={input.name}
					id="search-name"
				/>

				<Select
					id="demo-simple-select"
					value={designation}
					onChange={handleFilter}
					sx={{
						width: "224px",
						margin: "1rem 2rem",
						backgroundColor: "#0084ff",
						color: "white",
					}}
				>
					{designations.map((designation) => {
						return (
							<MenuItem value={designation} key={designation}>
								{designation}
							</MenuItem>
						);
					})}
				</Select>

				<Button
					variant="contained"
					onClick={resetDetails}
					sx={{
						marginLeft: "auto",
						marginRight: "3rem",
						marginTop: "1rem",
					}}
				>
					Reset
				</Button>
			</Box>
		</>
	);
};

export default SearchEmployee;
