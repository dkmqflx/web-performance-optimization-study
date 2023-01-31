import React from 'react';
import styled from 'styled-components';

// 각 항목의 막대 그래프를 나타내는 컴포넌트

const Bar = (props) => {
  return (
    <BarWrapper onClick={props.handleClickBar} isSelected={props.isSelected}>
      <BarInfo>
        <Percent>{props.percent}%</Percent>
        <ItemVaue>{props.itemValue}</ItemVaue>
        <Count>{props.count}</Count>
      </BarInfo>
      <BarGraph width={props.percent} isSelected={props.isSelected}></BarGraph>
    </BarWrapper>
  );
};

const BarWrapper = styled.div`
  position: relative;
  margin-bottom: 3px;
  padding: 8px 0;
  background: ${({ isSelected }) => (isSelected ? '#dddddd' : '#f3f3f3')};
`;
const BarInfo = styled.div`
  width: 100%;
  display: flex;
  z-index: 2;
  position: relative;
`;
const Percent = styled.span`
  text-align: right;
  min-width: 70px;
  flex: 0 0 auto;
`;
const ItemVaue = styled.span`
  padding-left: 60px;
  flex: 1 1 0%;
`;
const Count = styled.span`
  padding-right: 20px;
  flex: 0 0 auto;
`;
// transform 속성을 사용해서 reflow가 일어나지 않도록 한다
const BarGraph = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  /* width: ${({ width }) => width}%; */
  width: 100%;
  transform: scaleX(${({ width }) => width / 100});
  transform-origin: center left;
  /* 기준을 바꿔주는 속성, transform 속성을 사용해서 선택된 값이 바 가운데에 있는 문제를 해결한다  */
  /* transition: width 1.5s ease; */
  transition: transform 1.5s ease;

  height: 100%;
  background: ${({ isSelected }) =>
    isSelected ? 'rgba(126, 198, 81, 0.7)' : 'rgb(198, 198, 198)'};
  z-index: 1;
`;

export default Bar;
