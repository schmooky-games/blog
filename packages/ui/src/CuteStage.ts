import styled from "@emotion/styled";

export const StageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-items: center;
  align-items: center;
`;

export const StageText = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
`;

export const StageInner = styled.div`
  border: solid 1px rgba(69, 60, 52, 0.5);
  margin: 16;
  display: flex;
  flex-flow: row;
  align-self: center;
  border-radius: 8px;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
export const AnimationsCase = styled.div`
  display: flex;
  flex-flow: column;
  background-color: #433f50;
`;
export const AnimationCase = styled.button`
  background-color: #433f50;
  transition: color 1s;
  :hover {
    background-color: #87848f;
  }
`;