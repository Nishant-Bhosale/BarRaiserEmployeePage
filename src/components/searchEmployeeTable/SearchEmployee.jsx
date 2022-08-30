import React, { useState } from "react";
import {
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Box,
	Typography,
} from "@mui/material";

const SearchEmployee = ({ input, search, designations, filterEmp }) => {
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

	return (
		<>
			<Typography variant="h3" marginBottom="2rem" align="center">
				Search And Filter
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<TextField
					label="Name"
					variant="outlined"
					placeholder="Search By Employee Name Here..."
					type="search"
					name="name"
					onChange={handleInput}
					value={input.name}
					id="search-name"
					margin="0 2rem"
				/>

				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Select
						id="demo-simple-select"
						value={designation}
						onChange={handleFilter}
						sx={{ width: "224px", margin: "1rem 2rem" }}
					>
						{designations.map((designation) => {
							return (
								<MenuItem value={designation} key={designation}>
									{designation}
								</MenuItem>
							);
						})}
					</Select>
				</Box>
			</Box>
		</>
	);
};

export default SearchEmployee;
