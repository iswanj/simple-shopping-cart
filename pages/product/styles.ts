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

export const H1 = styled.h1`
  font-family: Georgia, "Times New Roman", Times, serif;
  color: #444;
  font-size: 2em;
`;

export const Price = styled.p`
  font-family: Georgia, "Times New Roman", Times, serif;
  color: #666;
  padding-top: 1em;
  padding-bottom: 1em;
`;

export const CartButton = styled.button`
  border: 2px solid #f60;
  background-color: transparent;
  padding: 8px 18px;
  display: flex;
  flex: 0;
  border-radius: 4px;
  align-self: flex-start;
  color: #555;
`;
