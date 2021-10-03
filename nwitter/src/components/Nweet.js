import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fbase";
import "./Nweet.css";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm(
            "Are you sure you want to delete this nweet?"
        );
        if (ok) {
            await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
            await deleteObject(ref(storageService, nweetObj.attachmentUrl));
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        updateDoc(doc(dbService, `nweets/${nweetObj.id}`), { text: newNweet });
        setEditing(false);
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };

    return (
        <div className='nweet'>
            {editing ? (
                <React.Fragment>
                    <form className='container nweetEdit' onSubmit={onSubmit}>
                        <input
                            className='formInput'
                            type='text'
                            placeholder='Edit your nweet'
                            value={newNweet}
                            onChange={onChange}
                            autoFocus
                            required
                        />
                        <input
                            className='formBtn'
                            type='submit'
                            value='Update Nweet'
                        />
                    </form>
                    <span className='formBtn cancelBtn' onClick={toggleEditing}>
                        Cancel
                    </span>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (
                        <img src={nweetObj.attachmentUrl} alt='Attachment' />
                    )}
                    {isOwner && (
                        <div className='nweet__actions'>
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default Nweet;
