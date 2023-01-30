## 2-1) 실습 내용 & 분석 툴 소개

### 실습 내용

- 애니메이션 최적화 (Reflow, Repaint)

  - 애니메이션 잘못 사용하면 버벅이면서 사용자 경험을 안좋게 마든다

- 컴포넌트 Lazy Loading (Code Splitting)

  - 앞서 배운 페이지 단위가 아닌, 한 페이지 안에서의 일반 컴포넌트를 Lazy Loading 한다

- 컴포넌트 Preloading

  - 분할한 코드를 그때 그때 부르는 것 아니라 미리 코드를 불러와서 컴포넌트에 대한 로딩을 최적화 하는 방법

- 이미지 Preloading

  - 이미지를 pre load해서 이미지가 화면에 더 빨리 나타날 수 있도록 하는 방법

- 애니메이션 -> 렌더링 성능 최적화

- 컴포넌트 Lazy Loading (Code Splitting), 컴포넌트 Preloading, 이미지 Preloading -> 로딩 성능 최적화

### 분석 툴

- 크롬 Network 탭

- 크롬 Performance 탭

- webpack-bundle-analyzer

<br/>

---

## 2-2) 서비스 탐색 & 코드 분석

---

<br/>

## 2-3) 애니메이션 분석 (Reflow와 Repaint 이론)

- Q. textContent 변경하면

  - innerText 를 사용해서 태그 내부의 글자를 변경한다면. DOM -> renderTree -> composition 인가요?

  - 아니면 전플로우 인가요 리페인트 인가요..

- A. innerText 의 변경은 어떤 렌더링 과정을 거치게 되는지 질문해주셨는데요.

  - 결론을 바로 말씀드리면, 모든 과정을 거치는 reflow가 일어납니다.

  - 그 이유는 innerText를 수정하는 것은 DOM 요소들의 사이즈에 영향을 미칠 수 있는 작업이기 때문입니다.

  - 아래 사이트는 어떤 작업 또는 css 요소가 reflow 또는 repaint를 일으키는지를 정리한 사이트입니다.

    - https://gist.github.com/paulirish/5d52fb081b3570c81e3a

    - https://csstriggers.com/

- Q. paint 단계 질문

  - 안녕하세요. paint단계에 대해 질문이 있습니다.

  - paint단계에서는 layout단계에서 크기와 위치가 계산된 것들을 영역별로 쪼개서 레이아웃을 만드는 것으로 알고 있는데 강의에서처럼 색을 칠하고 레이아웃도 만든다고 생각을 하면 될까요?

- A. layout과 paint 과정에 대해서 질문을 주셨는데요,

  - 우선 layout 과정에서는 요소들의 위치, 사이즈 등을 결정하고,

  - 그것을 기준으로 paint 단계에서는 스타일(색상, 테두리 등)을 입힙니다.

  - 말씀하신, paint 단계에서 레이아웃을 만든다는 말이 정확히 어떤 의미인지는 모르겠으나, 요소의 위치와 사이즈를 말씀하시는 거라면, 그 작업은 paint가 아니라 layout에서 이루어 집니다.

  - Q. 답변 감사합니다. 질문의 의도는 composite 단계에서 일어나는 레이아웃들을 차곡차곡 쌓는 과정에서 사용되는 레이아웃들이 어느 단계에서 만드는지에 대한 질문이였습니다.

  - A. Layout 단계 이후 Update layer tree 단계가 있습니다. 이 때 layer들을 나누게 되고, paint 단계를 거칩니다.

    - 참고: https://developers.google.com/web/updates/2018/09/inside-browser-part3?hl=ko#%EB%A0%88%EC%9D%B4%EC%96%B4%EC%97%90_%EB%8C%80%ED%95%9C_%EA%B3%A0%EC%B0%B0
