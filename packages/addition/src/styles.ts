import styled from "@emotion/styled";

export const CaseWrapper = styled.div`
  display: flex;
  flex-flow: column;
  background-color: #433f50;
  overflow-y: scroll;
`;

export const Case = styled.button<{ animPlayed?: boolean }>`
  color: #d9d9d9;
  background-color: ${(props) => (props.animPlayed ? "red" : "#433f50")};
  transition: color 1s;
  margin: 5px;
  margin-bottom: 0px;
  :hover {
    background-color: ${(props) => (props.animPlayed ? "red" : "#87848f")};
  }
`;