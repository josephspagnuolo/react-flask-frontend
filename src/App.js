import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./pages/home";
import EditContact from "./pages/edit";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/edit" element={<EditContact />} />
			</Routes>
		</Router>
	);
}

export default App;
