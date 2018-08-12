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
  height: 50px;
  background-color: #ddd;
  margin-bottom: 3px;
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
