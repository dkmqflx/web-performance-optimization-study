import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import Header from './components/Header';
import PhotoListContainer from './containers/PhotoListContainer';
import ImageModalContainer from './containers/ImageModalContainer';

axios.defaults.baseURL = 'http://localhost:3001';

function App() {
  return (
    <AppWrap>
      <GlobalStyle />
      <Header />
      {/* 메뉴 */}

      <PhotoListContainer />
      {/* 이미지 리스트 */}

      <ImageModalContainer />
      {/* 이미지 클릭했을 때 모달 */}
    </AppWrap>
  );
}

const AppWrap = styled.div`
  margin: 0 auto;
`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-size: 16px;
    background-color: #000;
  }

  ul, li, ol {
    list-style: none;
  }

  a, a:visited, a:active, a:hover {
    color: initial;
  }
`;

export default App;
