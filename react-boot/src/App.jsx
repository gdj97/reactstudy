import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Head from './components/Head.jsx'
import BoardList from './components/board/BoardList.jsx'
import BoardForm from './components/board/BoardForm.jsx'
import BoardInfo from './components/board/BoardInfo.jsx'
import BoardUpdateForm from './components/board/BoardUpdateForm.jsx'
/**
 * 2026-05-13 과제
 *  1. 게시판 목록 페이징처리부분 수정. 페이지부분 추가. 2페이지이상 조회
 *  2. 상세페이지에서 게시판 이름 출력
 *  3. 이력서, 자기소개서, 포트폴리오 준비하기
 */
function App() {
  const [cookies] = useCookies(['id']) //id이름의 쿠키정보
  return (
    <BrowserRouter>
      <Head cook={cookies.id} />  {/** 쿠키중 id이름의 쿠키값 Head 컨테이너에 전달 */}
      <Routes>
        <Route path="/" />
        <Route path="/board/boardList/:boardid" element={<BoardList />} />
        <Route path="/board/boardForm/:boardid" element={<BoardForm />} />
        <Route path="/board/boardInfo/:bnum" element={<BoardInfo />} />
        <Route path="/board/boardUpdateForm/:bnum" element={<BoardUpdateForm />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
