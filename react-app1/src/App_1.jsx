import { useState } from 'react'
import './App.css'

function App() {
  //자바스크립트의 영역
  return ( //JSX 영역
    <>
<h1>리액트 특징</h1>
<ul>
  <li>최초 1회 로드로 필요한 파일을 전부 받아옴</li>
  <li>동적렌더링 : 브라우저 내에서 변경된 부분의 데이터만 새로 출력함</li>
  <li>페이지 전체 새로고침되지 않으므로 깜빡임 없는 페이지 제공</li>
  <li>SPA(Single Page Application) : index.html 페이지만 보여짐</li>
  <li>index.html - main.jsx - App.jsx : App.jsx 페이지를 수정하면 화면이 변경됨</li>
</ul>
    </>
  )
}

export default App
