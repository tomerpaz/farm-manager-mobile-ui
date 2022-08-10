import React from "react"

import {Navigate, Outlet} from "react-router-dom"
import Login from "../features/auth/Login";

const useToken = () => {
	//get item from localstorage

	

	const token = localStorage.getItem("token")

	return token;
    // console.log('token', _user)
	// if (_user) {
	// 	user = JSON.parse(_user)
	// 	console.log("token", user)
	// }
	// if (user) {
	// 	return {
	// 		auth: true,
	// 		role: user.role,
	// 	}
	// } else {
	// 	return {
	// 		auth: false,
	// 		role: null,
	// 	}
	// }
}

//protected Route state


const ProtectedRoutes = (props) => {
	//const {auth, role} = useAuth()

	const token = useToken()

	// //if the role required is there or not
	// if (props.roleRequired) {
	// 	return auth ? (
	// 		props.roleRequired === role ? (
	// 			<Outlet />
	// 		) : (
	// 			<Navigate to="/denied" />
	// 		)
	// 	) : (
	// 		<Navigate to="/login" />
	// 	)
	// } else {
	// 	return auth ? <Outlet /> : <Navigate to="/login" />
	// }
    return token ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
