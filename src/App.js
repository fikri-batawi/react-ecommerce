import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import Homepage from "./pages/Homepage";
import Checkout from "./pages/Checkout";


function App() {
	return(
		<div>
			<Switch>
				<Route exact path="/" component={Homepage}/>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/register" component={Register}/>
				<Route exact path="/dashboard" component={Dashboard}/>
				<Route exact path="/checkout" component={Checkout}/>
			</Switch>
		</div>
	)
}

export default App;