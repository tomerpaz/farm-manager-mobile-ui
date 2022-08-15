import React from "react"
import { useDispatch, useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom"
import { useGetUserMutation } from "../features/auth/authApiSlice";
import { selectUser, setUserData } from "../features/auth/authSlice";
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


// const LoadUsers = async (token ) => {
// 	const [getUser, { isLoading }] = useGetUserMutation()
//     const dispatch = useDispatch()

// 	const userData = await getUser().unwrap()
// 	dispatch(setUserData({ token: token, user: userData }))
// }

const ProtectedRoutes = (props) => {
	//const {auth, role} = useAuth()

	const token = useToken()
	const user = useSelector(selectUser)

	// if (token) {
	// 	if (!user) {
	// 		LoadUsers();
	// 	}
	// }

	

	const ok = token && user;
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
