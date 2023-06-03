import styled from '@emotion/styled';

export const Header = styled.header`
  width: 100%;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 55px;

  background-color: rgb(43, 43, 43);
`;

export const SearchButton = styled.button`
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

  width: 75px;
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

export const BtnSpan = styled.span``;

export const SearchInput = styled.input`
  font-family: inherit;
  font-weight: 600;
  font-size: 14px;
  line-height: calc(30 / 14);
  letter-spacing: 0.06em;

  margin-left: 20px;
  padding-left: 10px;
  width: 250px;
  height: 35px;

  border-radius: 15px;

  outline: none;
  background-color: silver;
  color: black;
  border: 1px solid gold;
`;
