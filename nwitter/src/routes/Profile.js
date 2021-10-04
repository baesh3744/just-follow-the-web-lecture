import React, { useState } from "react";
import { useHistory } from "react-router";
import { authService } from "fbase";
import "./Profile.css";

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
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
        }
        refreshUser();
    };

    return (
        <div className='container'>
            <form className='profileForm' onSubmit={onSubmit}>
                <input
                    className='formInput'
                    type='text'
                    placeholder='Display name'
                    onChange={onChange}
                    value={newDisplayName}
                    autoFocus
                />
                <input
                    className='formBtn'
                    type='submit'
                    value='Update Profile'
                    style={{ marginTop: 10 }}
                />
            </form>
            <span className='formBtn cancelBtn logOut' onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};

export default Profile;
