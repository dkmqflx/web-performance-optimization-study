import React, { useState, Suspense, lazy, useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import InfoTable from './components/InfoTable';
import SurveyChart from './components/SurveyChart';
import Footer from './components/Footer';
// import ImageModal from './components/ImageModal';

function lazyWithPreload(importFunction) {
  const Component = React.lazy(importFunction);
  Component.preload = importFunction;

  console.log(Component);

  return Component;
}

// const LazyImageModal = lazy(() => import('./components/ImageModal'));
const LazyImageModal = lazyWithPreload(() => import('./components/ImageModal'));

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // import('./components/ImageModal');
    // 네트워크 탭 확인해보면 마지막에 모달과 관련된 번들 파일 다운로드 받은 것을 확인할 수 있다
    // Waterfall 항목보면 로드가 된 순간을 다른 파일과 비교해서 확인할 수 있다
    // 만약 여러 컴포넌트를 preload해줄 필요가 있다면 import를 직접 써주는 것이 번거롭다
    // 이 때 팩토리 패턴을ㄴ 사용한다

    LazyImageModal.preload();
    // 똑같이 마지막에 컴포넌트 로드되는 것을 확인할 수 있따

    const img = new Image();

    img.src =
      'https://stillmed.olympic.org/media/Photos/2016/08/20/part-1/20-08-2016-Football-Men-01.jpg?interpolation=lanczos-none&resize=*:800';

    // 네트워크 탭 확인하면 모달에 관한 chunk 파일과 이미지 다운로드 받은 것 확인할 수 있다
  }, []);

  // const handleMouseEnter = () => {
  //   // 마우스가 올라왔을 때 import가 실행되니까 모달과 관련된 코드가 로드 된다
  //   // 네트워크 탭 확인해보면 두개의 파일이 로드가 된 것을 확인할 수 있다
  //   // 0.2초 0.5초까지 시간이 걸린다
  //   // 컴퓨터가 새로운 파일을 로드하기에는 도움이 되는 순간
  //   // 만약 모듈 파일이 너무 커서 로드하는데 1초 이상은 필요한 경우라면
  //   // 마우스를 버튼 위에 올렸을 때 보다 더 먼저 파일을 로드할 필요가 있다
  //   // 모든 컴포넌트가 로드가 완료된 후 여유가 생겼을 때 모듈을 미리 로드하는 것이다
  //   // App 컴포넌트의 componentDidMount 순간
  //   import('./components/ImageModal');
  // };

  return (
    <div className='App'>
      <Header />
      <InfoTable />
      <ButtonModal
        onClick={() => {
          setShowModal(true);
        }}
        // onMouseEnter={handleMouseEnter}
      >
        올림픽 사진 보기
      </ButtonModal>
      <SurveyChart />
      <Footer />
      <Suspense fallback={null}>
        {showModal ? (
          <LazyImageModal
            closeModal={() => {
              setShowModal(false);
            }}
          />
        ) : null}
      </Suspense>
    </div>
  );
}

const ButtonModal = styled.button`
  border-radius: 30px;
  border: 1px solid #999;
  padding: 12px 30px;
  background: none;
  font-size: 1.1em;
  color: #555;
  outline: none;
  cursor: pointer;
`;

export default App;

// SurveyChart와 ImageModal 컴포넌트 최적화 포인트 있기 때문에 중요한 컴포넌트이다.
