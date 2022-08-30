import React, { useEffect, useState } from "react";

const Hierarchy = () => {
	const [manager, setManager] = useState({});

	useEffect(() => {
		fetch(
			"https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees",
		)
			.then((res) => res.json())
			.then((data) => {
				const managers = data.map((manager, i) => {
					delete manager.date_of_birth;
					delete manager.date_of_joining;
					delete manager.details;
					delete manager.salary;
					delete manager.address;
					delete manager.first_name;
					delete manager.designation;
					delete manager.last_name;

					const childs = data.filter((emp) => emp.manager_id === manager.id);
					manager.childs = childs;
					return manager;
				});
				setManager(managers[0]);
			});
	}, []);

	// let childrens = managers[0].childs;

	// const mainEl = document.createElement("div");

	// const createHierarchy = (childs) => {
	// 	if (childs.length === 0) return;

	// 	for (let i = 0; i < childs.length; i++) {
	// 		const temp = document.createElement("div");
	// 		temp.innerText = childs[i].id;
	// 		mainEl.insertAdjacentHTML(temp);
	// 	}
	// };

	// createHierarchy(childrens);
	return <h2>Tried My Best!</h2>;
};

export default Hierarchy;
