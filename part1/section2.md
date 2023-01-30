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

- Performance 탭의 CPU를 6x로 설정하면, 바를 눌렀을 때 버벅거리는 jank 현상이 나타나는 것을 확인할 수 있다

- 그리고 레코드 누른 다음에 클릭해주면, 훨씬 더 버벅이는 것을 확인할 수 있다

- 왜 이렇게 느린지 Element 탭을 눌러서 요소를 확인해 본다

- 바를 클릭할 때마다 width 값이 바뀌는 애니메이션이 일어나는 것을 확인할 수 있다.

- 쟁크 현상

  - 브라우저는 초딩 60 Frame으로 렌더링 해야 한다

  - 이렇게 버벅거리는 것은 초당 60 Frame으로 그리지 못했기 때문에 발생하는 현상이다

    - 예를들어 초당 30 Frame 또는 20 Frame으로 ㄱ려주면 애니메이션이 버벅이는 현상인 쟁크가 발생하게 된다

  - 그러면 브라우저는 왜 60 Frame을 제대로 그리지 못하는 것을까 ?

- 브라우저 렌더링 과정

  - DOM + CSSOM -> Render Tree -> Layout -> Paint -> Composite

- DOM + CSSOM

  - HTML과 CSS가공해서 DOM과 CSSOM이라는 두가지 형태의 트리구조를 바꾸어준다

  - DOM은 요소들 간의 관계를 트리 구조로 만든 것

  - CSSOM 각 요소의 스타일들을 트리 구조로 만든 것

  - DOM과 CSSOM을 조합해서 최종적으로 렌더 트리를 만들게 된다

  - 렌더트리는 요소에 대한 컨텐츠와 스타일을 가지고 있고 브라우저는 Layout이라는 단계로 넘어가게 된다

- Layout

  - 위치나 요소의 크기등을 계산해서 어느 위치에 요소가 있어야 하는지, 어느정도의 사이즈로 요소가 있어야 되는지와 같이 말 그대로 화면의 레이아웃을 잡는다

- Paint

  - 이렇게 그려진 레이아웃 위에 페인트를 한다

  - 즉 Background나 텍스트 Color, Box-shadow와 같은 색을 칠해 넣는다.

- Composite

  - 각 레이어를 합성하는 단계

  - 브라우자기 화면에 그릴 때 Layout, Paint 단계를 거칠 때 각 레이어로 쪼개서 진행이 된다

  - 그리고 여러개로 쪼개진 레이어들을 하나로 합쳐서 최종적인 화면을 그리는게 Composite 단계

- 이 저네적인 과정을 Critical Rendering Path (Pixel Pipeline) 이라고 한다

- 스타일이 변경되는 경우, 이 변화된 내용을 가지고 DOM+CSSOM 부터 모든 과정을 거치게 된다

- 그러니까 애니메이션 관점에서는 초당 60 프레임, 0.016초라는 시간안에 화면을 보여주어야 하는데, 이 짭은 시간 동안 이 많은 단계를 거치려다 보니 브라우저가 일부 화면을 생략하게 되어서 버벅거리는 것 처럼 보이는 것이다

- Performance 탭에서 CPU: 6x slow donw으로 설정한 다음 Record를 실행한 다음 바를 클릭해서 애니메션이 코드가 실행되도록 한다.

- 그리고 나서 결과를 확인해보면 Animation 항목에서 바 형태가 나타난 것을 보고 애니메이션이 일어난 것을 확인할 수 있다

- 그리고 Animation 아래 Timings는 리액트에서 실행한 함수를 보여주는데, 바를 클릭할 때 마다 함수가 실행된 것을 확인할 수 있다

- 위에 있는 Frame 항목에서는 화면이 그려지는 것을 확인할 수 있다

- 그리고 아래 Main 항목을 통해 Animation이 일어날 때 마다 Layout, Paint, Composite이 일어난 것 또한 확인할 수 있다

- 이 때 전체적으로 Frame 항목을 확대해보면 세로 점선이 있는데 이 순간에 화면이 노출되어야 한다는 것이다

- 하지만 Main 항목을 보면 브라우저는 아직 Composite Layer를 하고 있고 Frame 항목에서는 아직 화면이 없다

- 정상적이라면 점선 전에 Composite Layer까지 작업이 끝나고 작업이 끝난 화면을 보여주어야 했다.

- 하지만 작업이 늦게 끝났기 때문에, 점선 부분에서는 작업이 끝나기 이전 화면을 보여주고 그 이후 작업이 완료된 화면은 누락 되었다

- 이 작업을 미리 땡겨서 할 수 있는 방법은 브라우저에게 부담을 덜 주는 방식으로 애니메이션을 구현하면 된다

- 비용이 많이드는 Layout과 Paint 단계를 건너 뛰는 것이다

- Reflow

  - width, height가 변경되는경우 DOM+CSSOM 부터 모든 단계가 재실행되는데 이를 reflow라고 한다

- Repaint

  - color, background-color가 변경되는 경우, 어쨋든 CSS가 변경되었으니 DOM과 CSSOM다시 만들고 Render Tree를 만들게 된다

  - 하지만 색깔이 변경되었기 때문에 위치나 크기가 변경되지 않았기에 Layout 단계는 생략이 되고, Paint, Composite 단계만 진행된다

  - Layout 단계가 생략되었으니 Reflow보다는 빠르다

- Reflow와 Repaint 단계를 모두 건너뛰는 방법이 있다 (GPU 도움 받기)

  - GPU의 도움을 받아서 Reflow와 Repaint 단계를 모두 피한다

  - transform이다 opacity 같이 GPU가 관여할 수 있는 속성을 변경시키면 Layout과, Paint 단계가 생략이 된다

- 현재 애니메이션이 width와 height를 변경하고 있었기 때문에 reflow 가 일어나서 jank 현상이 일어났던 것

- 이것을 빠르게 하기 위해서는 Reflow를 일어나지 않도록 처리해준다

---

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
