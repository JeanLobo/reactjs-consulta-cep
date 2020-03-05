import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${props => (props.error ? '#ff6b6b' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    transition: border 0.25s ease-out;

    :focus {
      border: 2px solid #ff8e53;
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const Button = styled.button`
  background: none;
  height: 42px;
  width: 42px;
  border-radius: 4px;
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;

  :hover {
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    color: #fff;
    border: 1px solid #fff;
  }
`;

export const MenuGroup = styled.div`
  background: none;
  width: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const List = styled.ul`
  list-style-type: none;
  margin-top: 30px;

  li {
    padding: 15px 0;

    & + li {
      border-top: 1px solid #eee;
    }

    span {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      strong {
        font-size: 16px;
      }
    }

    a {
      height: 42px;
      width: 42px;
      border-radius: 4px;
      border: 1px solid #ff6b6b;
      color: #ff6b6b;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s;

      :hover {
        background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
        color: #fff;
        border: 1px solid #fff;
      }
    }
  }
`;

export const MenssageToast = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
