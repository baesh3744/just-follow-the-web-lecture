import React from "react";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "@firebase/auth";
import {
    faGithub,
    faGoogle,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService } from "fbase";
import AuthForm from "components/AuthForm";
import "./Auth.css";

const Auth = () => {
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService, provider);
    };

    return (
        <div className='authContainer'>
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size='3x'
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className='authBtns'>
                <button
                    className='authBtn'
                    name='google'
                    onClick={onSocialClick}
                >
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button
                    className='authBtn'
                    name='github'
                    onClick={onSocialClick}
                >
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
};

export default Auth;
