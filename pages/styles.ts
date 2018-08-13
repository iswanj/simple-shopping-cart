import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex: 1;
  margin: 0 auto;
  width: 900px;
  padding: 1em;
  overflow-y: auto;
  flex-direction: column;
`;

export const List = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const ListItem = styled.div`
  display: flex;
  padding: 20px 15px;
  flex: 1;
  background-color: #ddd;
  margin-bottom: 3px;
  color: #333;
  cursor: pointer;
  flex-direction: row;
  justify-content: space-between;
`;

export const TopBar = styled.section`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 1em;
`;

export const CartLink = styled.div`
  width: 120px;
  border: 1px solid #ccc;
  background-color: #ddd;
  border-radius: 4px;
  padding: 0.7em;
`;

export const Button = styled.button`
  padding: 4px 15px;
  background-color: #fff;
  border: 2px solid #f60;
  border-radius: 4px;
`;

export const Price = styled.p`
  font-weight: bold;
  font-size: 1em;
`;

export const Name = styled.p`
  font-size: 1em;
`;
