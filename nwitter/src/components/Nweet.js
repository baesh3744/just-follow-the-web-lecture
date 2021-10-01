import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { dbService, storageService } from "fbase";

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
        <div>
            {editing ? (
                <React.Fragment>
                    {isOwner && (
                        <React.Fragment>
                            <form onSubmit={onSubmit}>
                                <input
                                    type='text'
                                    placeholder='Edit your nweet'
                                    value={newNweet}
                                    onChange={onChange}
                                    required
                                />
                                <input type='submit' value='Update Nweet' />
                            </form>
                            <button onClick={toggleEditing}>Cancel</button>
                        </React.Fragment>
                    )}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (
                        <img
                            src={nweetObj.attachmentUrl}
                            alt='Attachment'
                            width='50px'
                            height='50px'
                        />
                    )}
                    {isOwner && (
                        <React.Fragment>
                            <button onClick={onDeleteClick}>
                                Delete Nweet
                            </button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default Nweet;
