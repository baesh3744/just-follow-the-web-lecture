import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fbase";
import "./NweetFactory.css";

const NweetFactory = ({ userObj }) => {
    const fileRef = useRef();
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        if (nweet === "") {
            return;
        }
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(
                storageService,
                `${userObj.uid}/${uuidv4()}`
            );
            const response = await uploadString(
                attachmentRef,
                attachment,
                "data_url"
            );
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await addDoc(collection(dbService, "nweets"), nweetObj);
        setNweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttachmentClick = () => {
        setAttachment("");
        fileRef.current.value = "";
    };

    return (
        <form onSubmit={onSubmit} className='factoryForm'>
            <div className='factoryInput__container'>
                <input
                    className='factoryInput__input'
                    type='text'
                    placeholder="What's on your mind?"
                    maxLength={120}
                    value={nweet}
                    onChange={onChange}
                />
                <input
                    className='factoryInput__arrow'
                    type='submit'
                    value='&rarr;'
                />
            </div>
            <label for='attach-file' className='factoryInput__label'>
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id='attach-file'
                type='file'
                accept='image/*'
                ref={fileRef}
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <div className='factoryForm__attachment'>
                    <img
                        src={attachment}
                        alt='Attachment'
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div
                        className='factoryForm__clear'
                        onClick={onClearAttachmentClick}
                    >
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    );
};

export default NweetFactory;
