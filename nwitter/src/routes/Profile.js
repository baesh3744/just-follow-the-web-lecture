import React, { useState } from "react";
import { useHistory } from "react-router";
import { updateProfile } from "@firebase/auth";
import { authService } from "fbase";

const Profile = ({ refreshUser, userObj }) => {
    let history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, { displayName: newDisplayName });
        }
        refreshUser();
    };

    return (
        <React.Fragment>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder='Display name'
                    onChange={onChange}
                    value={newDisplayName}
                />
                <input type='submit' value='Update Profile' />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </React.Fragment>
    );
};

export default Profile;
