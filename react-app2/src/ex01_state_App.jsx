import './App.css'
/*
  App.jsx => ex01_state_App.jsx 파일로 다른이름으로 저장하기
*/
import Hello from './components/ex01_Hello.jsx'
/*
   useState : 변경되는 데이터의 상태 관리해주는 Hook
    - 자바스크립트는 변수의 값이 변경되는 경우 화면이 자동으로 변경되지 않음
    - useState를 이용하여 만든 변수는 react가 감지하여 화면에 출력함 (Rendering됨)
    - [변수명(상태값), 상태값변경함수] = useState(상태의초기값)
*/
function App() {
  return (
     <div className='App'>
      <Hello age="10"/> {/** age 속성의 값의 자료형 문자열임 */}
      <Hello age={20}/> {/** age 속성의 값의 자료형 숫자임 */}
      <Hello age={10}/> {/** age 속성의 값의 자료형 숫자임 */}
     </div>
  )
}

export default App
