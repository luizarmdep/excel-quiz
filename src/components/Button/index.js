import styled from 'styled-components';

const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.contrastText};
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