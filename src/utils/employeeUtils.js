// Utility functions
const filterEmployees = (employees, name, des) => {
	// Filtering data using regex
	const filteredData = employees.filter((employee) => {
		const regex = new RegExp(`${name}`, "gi");
		return (
			(employee.first_name.match(regex) ||
				employee.last_name.match(regex) ||
				employee.id[0].match(regex) ||
				employee.date_of_birth.match(regex) ||
				employee.address.match(regex)) &&
			(des ? employee.designation === des : true)
		);
	});
	return filteredData;
};

// Getting the keys of an object
const getColumnLabels = (emp) => {
	return Object.keys(emp);
};

export { filterEmployees, getColumnLabels };
