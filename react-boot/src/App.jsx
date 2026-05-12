import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Head from './components/Head.jsx'
import BoardList from './components/board/BoardList.jsx'
function App() {
  const [cookies] = useCookies(['id'])
  return (
    <BrowserRouter>
      <Head cook={cookies.id} />
      <Routes>
        <Route path="/board/boardList/:boardid" element={<BoardList />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
