import styled from 'styled-components';

const ButtonText = styled.button`
  background: none;
  height: 42px;
  width: 90px;
  border-radius: 4px;
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s;
  font-weight: bold;
  padding: 10px;

  :hover {
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    color: #fff;
    border: 1px solid #fff;
    font-weight: bold;
  }
`;

export default ButtonText;
