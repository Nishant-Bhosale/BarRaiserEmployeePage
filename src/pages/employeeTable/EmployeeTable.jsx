import { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	Typography,
	TableRow,
	Paper,
	Box,
	CircularProgress,
} from "@mui/material";
import NotFoundSVG from "../../assets/NotFoundSVG";
import classes from "./employeeTable.module.css";
import { filterEmployees, getColumnLabels } from "../../utils/employeeUtils";
import { Link } from "react-router-dom";
import SearchEmployee from "../../components/searchEmployeeTable/SearchEmployee";
import EmployeeTableRow from "../../components/EmployeeTableRow";

export default function StickyHeadTable() {
	const [employees, setEmployees] = useState([]);
	const [filteredEmployees, setFilteredEmployees] = useState([]);
	const [designations, setDesignations] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(
			"https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees",
		)
			.then((res) => res.json())
			.then((data) => {
				const transformedData = getRowValues(data);
				setEmployees(transformedData);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, []);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const getRowValues = (data) => {
		const uniqueDesignations = new Set();
		uniqueDesignations.add("All");
		const transformedData = data.map((emp) => {
			const { details, ...rest } = emp;

			uniqueDesignations.add(rest.designation);

			rest.id = [rest.id, rest.first_name, details];

			return rest;
		});

		const arr = [...uniqueDesignations];

		setDesignations(arr);
		return transformedData;
	};

	const [searchInput, setSearchInput] = useState({ name: "", des: "All" });

	const handleSearch = (name, des) => {
		let filteredData;
		if (name === "") {
			setFilteredEmployees(employees);
			return;
		}

		if (filteredEmployees.length && des !== "All") {
			filteredData = filterEmployees(filteredEmployees, name);
			setFilteredEmployees(filteredData);
			return;
		}

		filteredData = filterEmployees(employees, name);
		setFilteredEmployees(filteredData);
	};

	const handleFilter = (des) => {
		if (des === "All") {
			setFilteredEmployees([]);
		}

		const filteredData = employees.filter((employee) => {
			return employee.designation === des;
		});

		setFilteredEmployees(filteredData);
	};

	useEffect(() => {
		handleSearch(searchInput.name, searchInput.des);
	}, [searchInput]);

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
		<Box
			sx={{
				minHeight: "85vh",
			}}
		>
			<div className="tableOptions">
				<SearchEmployee
					input={searchInput}
					search={setSearchInput}
					designations={designations}
					filterEmp={handleFilter}
				/>
			</div>
			{
				<div className="tableWrapper">
					<Paper
						sx={{
							width: "95%",
							overflow: "hidden",
							margin: "1rem auto",
							align: "center",
						}}
					>
						{searchInput.name && filteredEmployees.length === 0 ? (
							<div style={{ display: "flex", justifyContent: "center" }}>
								<NotFoundSVG />
							</div>
						) : (
							<TableContainer
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
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											{getColumnLabels(employees[0]).map((label, idx) => {
												return (
													<TableCell
														key={label}
														align="center"
														style={{ minWidth: "170" }}
														className={classes.tableCell}
													>
														{label.replaceAll("_", " ")}
													</TableCell>
												);
											})}
										</TableRow>
									</TableHead>
									{
										<TableBody>
											{(!!filteredEmployees.length
												? filteredEmployees
												: employees
											)
												.slice(
													page * rowsPerPage,
													page * rowsPerPage + rowsPerPage,
												)
												.map((employee, index) => {
													return (
														<EmployeeTableRow
															employee={employee}
															index={index}
														/>
													);
												})}
										</TableBody>
									}
								</Table>
							</TableContainer>
						)}
						{searchInput.name && filteredEmployees.length === 0 ? (
							<p></p>
						) : (
							<TablePagination
								rowsPerPageOptions={[10, 25, 100]}
								component="div"
								count={employees.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						)}
					</Paper>
				</div>
			}
		</Box>
	);
}
