import React from 'react';

// create an empty button for sign-in and sign-out
const Button = ({onClick = null,  children = null}) => (
  <button onClick={onClick}>{children}</button>  
);

export default Button;