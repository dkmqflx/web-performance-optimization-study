import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SurveyItem from './SurveyItem';

const SurveyChart = () => {
  const [answer, setAnswer] = useState([]);
  const [survey, setSurvey] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/answer').then((res) => res.json()),
      fetch('http://localhost:3001/survey').then((res) => res.json()),
    ]).then(([answer, survey]) => {
      setAnswer(answer.data);
      setSurvey(survey);
    });
  }, []);

  //  리우롤림픽, 런던올림픽 Bar 클릭 했을 때, 해당 올림픽을 선택한 사람들의 응답을 보여주기 위한 함수
  const toggleFilter = (questionIndex, itemIndex) => {
    let _filter = Object.assign({}, filter);
    // questionIndex : 몇번째 질문인지
    // itemIndex : 해당 질문에 대해서 몇번째 보기를 선택했는지

    if (
      _filter.hasOwnProperty(questionIndex) &&
      _filter[questionIndex] === itemIndex
    ) {
      //   똑같은 바 클릭 했을 때, 바 클릭하기 이전에 원래 상태로 돌아가는 로직
      delete _filter[questionIndex];
    } else {
      _filter[questionIndex] = itemIndex;
    }
    setFilter(_filter);
    // 선택한 응답 답변을 filter 값으로 설정한다
  };

  // 선택한 항목에 대한 답변만 필터링,
  //   위의 toggleFilter 함수가 호출되어서 filter 값이 변경될 때 마다 컴포넌트가 렌더링 되기 때문에, 아래 값도 새롭게 변경된다
  let filteredAnswer = answer.filter((item) => {
    // answer는 2d 배열로, item으로 [1, 3, 1, 1, 1, 2] 배열이 전달된다
    // index는 질문에 대한 응답
    // 0번째 index는 1번째 bar에 대한 응답

    var keys = Object.keys(filter);
    //keys는 처음에는 빈 배열로, filter가 선택되었을 때 해당하는 key들이 배열에 담긴다

    for (let i = 0; i < keys.length; i++) {
      if (filter[keys[i]] !== item[keys[i]]) return false;
    }
    return true;
  });

  // 답변 정보를 항목별 통계 정보로 재가공
  let chartData = {};
  for (let i = 0; i < filteredAnswer.length; i++) {
    for (let j = 0; j < filteredAnswer[i].length; j++) {
      if (!chartData.hasOwnProperty(j)) {
        chartData[j] = {};
      }
      if (!chartData[j].hasOwnProperty(filteredAnswer[i][j])) {
        chartData[j][filteredAnswer[i][j]] = 0;
      }
      chartData[j][filteredAnswer[i][j]]++;
    }
  }
  /**
    chartData는 아래와 같은 값을 가진다 
    0: {0: 1049, 1: 851}
    1: {0: 487, 1: 468, 2: 371, 3: 265, 4: 309}
    2: {0: 550, 1: 357, 2: 363, 3: 354, 4: 276}
    3: {0: 467, 1: 747, 2: 390, 3: 296}
    4: {0: 605, 1: 736, 2: 272, 3: 287}
    5: {0: 701, 1: 544, 2: 655}
   */

  return (
    <SurveyChartWrapper>
      <SurveyChartTitle>설문 결과</SurveyChartTitle>
      {survey.map((item, index) => (
        <SurveyItem
          key={`survey-item-${index}`}
          data={chartData[index] || {}}
          survey={item}
          toggleFilter={toggleFilter}
          selectedItem={filter[index]}
        />
      ))}
    </SurveyChartWrapper>
  );
};

const SurveyChartWrapper = styled.div`
  padding: 150px 20px 60px 20px;
  max-width: 800px;
  margin: auto;
  box-sizing: border-box;
`;

const SurveyChartTitle = styled.div`
  text-align: center;
  font-size: 2em;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
  padding-bottom: 20px;
`;

export default SurveyChart;
