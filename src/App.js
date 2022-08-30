import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeTable from "./pages/employeeTable/EmployeeTable";
import EmployeeDetails from "./pages/employeeDetails/EmployeeDetails";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<EmployeeTable />} />
				<Route path="/:name" element={<EmployeeDetails />} />
			</Routes>
		</Router>
	);
}

export default App;
