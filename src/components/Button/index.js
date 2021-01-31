import styled from 'styled-components';

const Button = styled.button`
    background-color: #017338;
    color: white; 
    width: 100%;
    padding: 12px;
    margin-top: 25px;
    border: 1px solid;
    border-radius: 2px;
    font-weight: bold;

    &:hover,
  &:focus {
    opacity: .5;
  }
  &:disabled {
    background-color: #c8c8c9;
    cursor: not-allowed;
  }
`
export default Button;