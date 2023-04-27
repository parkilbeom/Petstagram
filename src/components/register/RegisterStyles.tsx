import styled from "styled-components";

export const RegisterButton = styled.button`
  cursor: pointer;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0;
  width: 315px;
  height: 45px;
  background: #ffb800;
  border-radius: 5px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  @media only screen and (max-width: 767px) {
    width: 253px;
  }
`;
export const RegisterInput = styled.input`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  border: none;
  color: #a5a5a5;
  align-items: center;
  padding: 8px 20px;
  margin: 0 auto;
  gap: 10px;
  width: 275px;
  height: 29px;
  background: #fff3ca;
  border-radius: 3px;
  @media only screen and (max-width: 767px) {
    width: 213px;
  }
`;
