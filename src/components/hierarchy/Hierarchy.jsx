import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	CircularProgress,
} from "@mui/material";

const Hierarchy = () => {
	const [manager, setManager] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Fetch Data
	const fetchData = async () => {
		try {
			const res = await fetch(
				"https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees",
			);

			const data = await res.json();

			setIsLoading(false);

			const managers = data.map((manager, i) => {
				delete manager.date_of_birth;
				delete manager.date_of_joining;
				delete manager.details;
				delete manager.salary;
				delete manager.address;
				delete manager.designation;

				const childs = data.filter((emp) => emp.manager_id === manager.id);
				manager.childs = childs;
				return manager;
			});
			setManager(managers);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	// Show loader if state is loading
	if (isLoading) {
		return (
			<Box
				sx={{ display: "flex", margin: "25% auto", justifyContent: "center" }}
			>
				<CircularProgress color="success" />
			</Box>
		);
	}

	return (
		<>
			<TableContainer
				component={Paper}
				sx={{
					maxHeight: "90vh",
					minHeight: "85vh",
					"&::-webkit-scrollbar": {
						width: 10,
					},
					"&::-webkit-scrollbar-track": {
						backgroundColor: "transparent",
					},
					"&::-webkit-scrollbar-thumb": {
						backgroundColor: "#2797ff",
						borderRadius: 1,
					},
				}}
			>
				<Table aria-label="simple table" stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell
								align="center"
								style={{ background: "rgb(44 48 54)", color: "white" }}
							>
								Manager
							</TableCell>
							<TableCell
								align="center"
								style={{ background: "rgb(44 48 54)", color: "white" }}
							>
								Employees
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{manager.map((employee, index) => {
							const backgroundColor = index % 2 ? "#f1f1f1" : "white";

							return (
								employee.childs.length > 0 && (
									<TableRow
										key={employee.id}
										sx={{
											"&:last-child td, &:last-child th": { border: 0 },
											backgroundColor: backgroundColor,
										}}
									>
										<TableCell align="center">
											{employee.id} {employee.first_name} {employee.last_name}
										</TableCell>
										<TableCell align="center">
											{employee.childs.map((child) => {
												return (
													<span style={{ display: "block" }} key={child.id}>
														{child.id} - {child.first_name} {child.last_name}
													</span>
												);
											})}
										</TableCell>
									</TableRow>
								)
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Hierarchy;
