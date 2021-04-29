import React from 'react';
import { formatRelative } from 'date-fns';
import {fr} from 'date-fns/esm/locale';
import {createdAtLocale} from '../services';

const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = '',
}) => {
    return (
        <div >
            {photoURL ? (
                <img  className="rounded-full" src={photoURL} alt="avatar" width={45} height={45} />) : null}
            {displayName ? <p>{displayName}</p> : null}
            {createdAt.seconds ? (
                
                <span>
                    {formatRelative(new Date(createdAt.seconds * 1000), new Date(), {createdAtLocale} )} 
                </span>
            ) : null}
            <p>{text}</p>   
        </div>
    );
};

export default Message;