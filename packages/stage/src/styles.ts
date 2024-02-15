import styled from "@emotion/styled";

export const StageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
  width: 100%;
`;

export const StageText = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
`;

export const StageInner = styled.div`
  position: relative;
  border: solid 1px rgba(69, 60, 52, 0.5);
  margin: 16;
  display: flex;
  flex-flow: row;
  align-self: center;
  border-radius: 8px;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  max-height: 400px;
  grid-column-start: 2;
`;

export const ZoomCase = styled.div`
  font-size: 20px;
  position: absolute;
  left: 10px;
  bottom: 10px;
  color: white;
`;

export const StagePanel = styled.div`
  position: relative;
  border: solid 1px rgba(69, 60, 52, 0.5);
  grid-column: span 1;
  margin: 16;
  display: grid;
  border-radius: 8px;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  height: 100%;
`;

export const StageOuter = styled.div`
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;
