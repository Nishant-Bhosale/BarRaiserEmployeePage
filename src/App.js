import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import EmployeeTable from "./pages/employeeTable/EmployeeTable";
import EmployeeDetails from "./pages/employeeDetails/EmployeeDetails";
import HierarchyPage from "./pages/hierarchyPage/HierarchyPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<EmployeeTable />} />
				<Route path="/:name" element={<EmployeeDetails />} />
				<Route path="/hierarchy" element={<HierarchyPage />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Router>
	);
}

export default App;
