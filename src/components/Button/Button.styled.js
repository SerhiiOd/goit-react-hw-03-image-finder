import styled from '@emotion/styled';

export const LoadMoreButton = styled.button`
  font-family: inherit;
  font-weight: 700;
  font-size: 14px;
  line-height: calc(30 / 14);
  letter-spacing: 0.06em;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  border-radius: 15px;

  width: 125px;
  height: 35px;
  margin-left: 10px;

  outline: none;
  cursor: pointer;

  background-color: rgb(150, 150, 167);
  color: black;
  border: 2px solid gold;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    border 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: gold;
    border: 2px solid rgb(150, 150, 167);
  }
`;
