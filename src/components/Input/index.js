import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const InputBase = styled.input`
    background-color: black;
    color: white; 
    width: 100%;
    padding: 10px;
    margin-top: 16px;
    border: 1px solid;
    border-color:#017338;
    border-radius: 2px;
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 0.7; /* Firefox */
    }
`;

export default function Input({onChange, placeholder, ...props}){
  return(
      <div>
        <InputBase 
            placeholder={placeholder}
            onChange={onChange} 
            {...props}
        />
      </div>
  )
};

Input.defaultProps = {
    value: '',
};

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};