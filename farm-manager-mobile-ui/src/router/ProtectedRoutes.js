import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
	const token = localStorage.getItem("token")
	return token ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes


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
