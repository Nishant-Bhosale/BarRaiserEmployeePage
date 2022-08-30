import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { Link } from "react-router-dom";

const EmployeeTableRow = ({ employee, index }) => {
	const backgroundColor = index % 2 ? "#f1f1f1" : "white";
	return (
		<TableRow
			hover
			tabIndex={-1}
			sx={{ backgroundColor: { backgroundColor } }}
			key={employee.id}
		>
			{Object.values(employee).map((val, i) => {
				return (
					<TableCell key={val} align="center">
						{i === 0 ? (
							val[2] ? (
								<Link to={`/${val[1]}`}>{val[0]}</Link>
							) : (
								val[0]
							)
						) : (
							val || "-"
						)}
					</TableCell>
				);
			})}
		</TableRow>
	);
};

export default EmployeeTableRow;
