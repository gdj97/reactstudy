import { useState } from 'react'   //사용하지 않음. Hook이라고함.  
import './App.css'       //사용하지 않음. css 파일 불러옴
import  Hello from "./components/Hello.jsx"   //컴포넌트. 재사용
/*
   App 컴포넌트 : main.jsx 페이지에서 호출. 최상위 컴포넌트임. 
*/
function App() {
  //렌더링 부분 : 화면에 출력해주는 부분
  // JSX(JavaScript XML) 객체 반환. => 화면 출력 부분
  //     가장바깥쪽의 태그는 한개만 가능함 <> ... </> 라도 표시해야 함
  return (
    <div>
     {/**   JSX의 주석 표현 
         Hello 컴포넌트 호출
         여러번 호출함 => 컴포넌트를 재사용한다고 함
     */}
      <Hello /> 
      <Hello />
      <Hello />
      <Hello />
      <Hello />
    </div>
  )
}

export default App    //main.jsx 페이지에서 App 컴포넌트 사용함
