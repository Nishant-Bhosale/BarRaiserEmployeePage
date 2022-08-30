import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
	Box,
	CircularProgress,
	TableBody,
	TableHead,
	TableContainer,
	TableCell,
	TableRow,
	Table,
	Paper,
	Typography,
} from "@mui/material";
import NotFoundSVG from "../../assets/NotFoundSVG";

const EmployeeDetails = () => {
	// Extracting name from parameters
	const { name } = useParams();

	// States
	const [employee, setEmployee] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const getEmployeeDetails = async () => {
		try {
			const res = await fetch(
				`https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/${name}`,
			);
			const data = await res.json();
			setIsLoading(false);
			delete data[0].details;
			setEmployee(data[0]);
		} catch (e) {
			console.log(e);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getEmployeeDetails();
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

	// If no employee with the given name or id is found
	if (!Object.keys(employee).length) {
		return (
			<>
				<Typography variant="h2" align="center" marginTop="3rem">
					Employee details not found
				</Typography>
				<Box
					sx={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}
				>
					<NotFoundSVG />
				</Box>
			</>
		);
	}

	return (
		<>
			<Typography variant="h2" align="center" margin="3rem">
				Employee Details
			</Typography>
			<TableContainer
				component={Paper}
				sx={{ maxWidth: 450, margin: "3rem auto" }}
				align="center"
			>
				<Table
					sx={{ width: "100%", border: "2px solid black" }}
					aria-label="simple table"
				>
					<TableHead>
						<TableRow>
							<TableCell align="center">Field</TableCell>
							<TableCell align="center">Value</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.entries(employee).map((emp, i) => (
							<TableRow
								key={i}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell
									component="th"
									scope="row"
									align="center"
									style={{ textTransform: "capitalize" }}
								>
									{emp[0].replaceAll("_", " ")}
								</TableCell>
								<TableCell component="th" scope="row" align="center">
									{i === 5 ? `$${emp[1]}` : emp[1]}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default EmployeeDetails;
