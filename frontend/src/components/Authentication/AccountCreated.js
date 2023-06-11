import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// MUI
import {
	
	Typography,

} from "@mui/material";

// Contexts
import DispatchContext from "../../contexts/DispatchContext";
import StateContext from "../../contexts/StateContext";

function AccountCreated() {
	const navigate = useNavigate();

	const GlobalDispatch = useContext(DispatchContext);
	const GlobalState = useContext(StateContext);

	return (
		<div
			style={{
				width: "50%",
				marginLeft: "auto",
				marginRight: "auto",
				marginTop: "3rem",
				border: "5px solid black",
				padding: "3rem",
			}}
		>
			<Typography variant="h4">
				Thanks for signing up! To activate your account, please click on the
				link that has been sent to you!
			</Typography>
		</div>
	);
}

export default AccountCreated;