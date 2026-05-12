import './App.css';
import Header from './components/ex02_map_Header.jsx';
import Day from './components/ex03_route_Day.jsx';
import DayList from './components/ex03_route_DayList.jsx';
import NotFoundPage from './components/ex03_NotFoundPage.jsx';
/*
   react-router-dom : 페이지 이동 기능 담당 라이브러리
                      SPA 환경에서 페이지 이동 담당. npm install이 필요
    BrowserRouter  : Route 최상위 컴포넌트. URL을 통기화. 
    Routes         : Route 컴포넌트의 부모 컴포넌트. Route 중 한개만 렌더링 되도록 관리 
    Route          : 컴포넌트 이동 URL. path와 컴포넌트 매칭
*/
import {BrowserRouter, Routes,Route} from 'react-router-dom'; //npm install react-router-dom
function App() {
   return (
    <BrowserRouter> {/** 최상위 라우팅 컴포넌트  */}
    <div className="App">
      <Header />
      <Routes> 
      <Route path="/" element={<DayList />} />      {/**  http://localhost:5713 요청시  DayList 컴포넌트 호출*/}
      <Route path="/day/:day" element={<Day />} />  {/**  http://localhost:5713/day/:day 요청시  Day 컴포넌트 호출*/}
      <Route path="*" element={<NotFoundPage />} /> {/**  http://localhost:5713/ 그외 요청시  NotFoundPage 컴포넌트 호출*/}
      </Routes>
    </div>
    </BrowserRouter>
  )

}
export default App;
