import React from "react";
import { useHistory } from "react-router";
import { authService } from "fbase";

const Profile = () => {
    let history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    return (
        <React.Fragment>
            <button onClick={onLogOutClick}>Log Out</button>
        </React.Fragment>
    );
};

export default Profile;
