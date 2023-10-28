import { Navigate } from "react-router-dom";
const Protected = ({ children }) => {
	const storedAddress = localStorage.getItem("user_address");
	if (storedAddress) {
		return children;
	}
	return <Navigate to='/'/>;
};

export default Protected;
