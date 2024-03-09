#### [인프런 워밍업 클럽 FE 0기] 미션8 - 디즈니 플러스 앱

# 🎞 Disney Plus APP

- [Inflearn Blog](https://www.inflearn.com/blogs/7168)

## Demo

![Alt text](/9-disney-plus-app/disney-plus-app.gif)

Record by [ScreenToGif](https://www.screentogif.com/)

## 개요

- **인프런 워밍업 클럽 FE 0기**의 여덟 번째 미션인 '디즈니 플러스 앱' 입니다.
- [따라하며 배우는 리액트](https://www.inflearn.com/course/따라하는-리액트) 섹션 4~5(리액트로 Netflix 앱 만들기)

## 목표

- **[swiper](https://swiperjs.com/)** 라이브러리 커스텀해보기
- **[react-oauth/google](https://github.com/MomenSherif/react-oauth)** 로 구글 로그인 연동해보기

## 구현

> **swiper** 라이브러리 커스텀해보기

```jsx
// LoginPage
import "swiper/css/effect-fade";

<Swiper
  modules={[Autoplay, EffectFade, Pagination, A11y]}
  autoplay={auto}
  effect={"fade"}
  pagination={{
    clickable: true,
  }}
  loop={true}
  fadeEffect={{ crossFade: true }}
  slidesPerView={1}
  speed={2000}
>
  {...}
</Swiper>

// Row.tsx
import "swiper/css/mousewheel";

<Swiper
  modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
  navigation
  pagination={{ clickable: true }}
  mousewheel
  speed={1000}
  spaceBetween={10}
>
  {...}
</Swiper>
```

2024년 3월 10일의 디즈니 플러스 메인 페이지를 그대로 옮겨보고자 swiper 라이브러리를 커스텀해봤다.

로그인 페이지에서는 좌우로 넘기는 슬라이드가 아닌 fade-in-out의 슬라이드를 구현하기 위해 swiper에 EffectFade 모듈을 추가하고 fadeEffect 속성을 추가했다.

이 fadeEffect가 제대로 작동하기 위해선 반드시 해당 이펙트의 css를 추가해야 한다.

다른 모듈이나 컴포넌트를 추가할 때처럼 자동으로 추가되지 않으니 주의해야 한다. (이걸 몰라서 한참을 찾았다. 😥)

Row 컴포넌트는 마우스 휠에 따라 움직이는 슬라이드를 만들기 위해 Mousewheel 모듈과 속성을 이용했다.

이렇게 슬라이드 속성을 정한 뒤에 swiper가 렌더링하는 요소의 class를 찾아 CSS에서 원하는 디자인으로 변경하면 된다.

이때 라이브러리의 CSS와 겹치는 속성이 있을 수 있기 떄문에 '!important'를 붙이는 게 좋다.

<br />

> **react-oauth/google** 로 구글 로그인 연동해보기

```jsx
// index.js
<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</GoogleOAuthProvider>;

// App.jsx
const navigate = useNavigate();
const [isLogin, setIsLogin] = useState(
  localStorage.getItem("user") ? true : false
);

useEffect(() => {
  isLogin ? navigate("/") : navigate("/login");
}, [isLogin]);

<Routes>
  {isLogin ? (
    <Route path="/" element={<Layout setIsLogin={setIsLogin} />}>
      <Route index element={<MainPage />} />
      <Route path=":movieId" element={<DetailPage />} />
      <Route path="search" element={<SearchPage />} />
    </Route>
  ) : (
    <Route path="login" element={<LoginPage setIsLogin={setIsLogin} />} />
  )}
</Routes>;
```

react-oauth/google는 구글 로그인을 지원하는 라이브러리로, 사전에 구글의 Cloud에서 API 등록을 하고 Client ID를 발급받아야 사용할 수 있다.

먼저 프로젝트의 최상위에 GoogleOAuthProvider로 감싸준다.

그리고 사용자의 로그인 여부에 따라 페이지를 이동시키기 위해 라우터를 설정한 App 컴포넌트에서 관련 코드를 작성했다.

페이지가 렌더링 될 때 로컬 스토리지에 저장된 유저 정보를 받아오고 만약 없다면 로그인 페이지로 보내도록 했다.

```js
// loginPage
const googleLogin = async (credentialResponse) => {
  localStorage.setItem(
    "user",
    JSON.stringify(jwtDecode(credentialResponse.credential))
  );
  setIsLogin(true);
};

<GoogleLogin
  onSuccess={(credentialResponse) => googleLogin(credentialResponse)}
/>;
```

GoogleLogin 컴포넌트는 react-oauth/google 라이브러리에서 지원하는 버튼 컴포넌트로 디자인 및 로그인 관련 함수가 내장되어 있다.

onSuccess는 사용자의 로그인이 성공했을 때 실행되는 콜백 함수이며, 인자로 로그인한 유저의 정보를 담은 데이터를 갖는다.

여기서 credential이라는 값은 유저의 정보를 담고 있는 토큰으로 암호화되어 있기 때문에 jwt-decode 라이브러리를 이용해 디코딩하여 사용해야 한다.

여기서 받은 picture는 사용자의 프로필 이미지 링크를 포함하고 있어서 Nav 컴포넌트에서 사용해 로그인한 유저의 프로필 이미지로 변경했다.

## 회고

'Netflix 앱 만들기'를 하면서 사용했던 기술이 대부분이라 오래 걸리지 않을 것 같았지만...

라이브러리 알아보고 문서 읽고 실행해보고... 하는 데 너무 오래 걸린 것 같다.

배너 하단의 카테고리 부분은 이전에 같은 과제를 하셨던 분의 깃허브를 참고했다. (https://github.com/kimneighbor/clone-disney-plus-app)

로그인 페이지는 따라하기 싫어서 현재 [디즈니 플러스 홈페이지](https://www.disneyplus.com/ko-kr)를 보고 참고했다.

그대로 하면 얼마 안 걸릴 거라 생각했는데 생각보다 라이브러리 커스텀에서 좀 애를 먹었다. 😅

```
with_networks: "2739"
```

2739는 TMDB에서 디즈니 플러스 방송사(networks) 코드라서 axios의 instance 기본 값에 추가했다.

몇몇 요청은 해당 파라미터가 통하지 않거나 오류를 보내기도 해서 완벽하진 않다.

디즈니 플러스에서 API를 제공했다면 더 알맞게 페이지를 구현할 수 있었을 텐데 하는 아쉬움이 남는다.

한편 영화 정보 API를 제공해주는 [TMDB(The Movie Database)](https://www.themoviedb.org/) 같은 곳이 있어 감사하고 다행이라는 생각이 들었다.

프론트엔드 공부하는데 API를 제공해주는 곳이 아예 없었다면 혹은 매번 일정 비용을 지불해야 했다면 얼마나 힘들었을까

로그인도 사실 좀 더 좋은 라우팅 구조나 상태 관리 라이브러리를 공부하고 사용해보고 싶었지만...

계속 욕심만 커지는 것 같아 최대한 간단하게 구현하려 했다.

(사실 과제 밀려서 조바심에 아무것도 못 했다... 😂)
