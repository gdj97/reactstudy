import { useState } from 'react'   //사용하지 않음. Hook이라고함.  
import './App.css'       //사용하지 않음. css 파일 불러옴

function App() {
  const name = "Tom"
  const naver = {
     name : "네이버",
     url : "https://www.naver.com"
  }
/**
   JSX 내의 태그
   1. class 속성을 설정시 className으로 사용해야함. class단어는 자바스크립트의 예약어로 정의됨 => 사용불가
   2. style 설정시 
      - {{ 내에 설정해야함}}
      - background-color => backgroundColor 속성으로 표현해야함 
 */
  return (
   <div className="App">
     <h1 style={{color:'yellow', backgroundColor:"blue"}}>Hello, {name}</h1>
     <a href={naver.url} target='_blank'>{naver.name}</a>
     <br />
     <p>{2+3}</p>
  </div>
  )
}

export default App 
