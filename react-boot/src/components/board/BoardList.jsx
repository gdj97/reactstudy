import { Link } from "react-router-dom";
import {useState, useEffect} from "react"
import {useParams, useLocation} from "react-router-dom"
import dayjs from 'dayjs'  //npm install dayjs. 날짜 형식 처리 기능
/*
  Hook
    useState : 상태값 변경
    useEffect : 화면이 렌더링 이후 비동기적으로 실행 해야 하는 부수적인효과(side effects)를 처리
    useParams : url에서 전달되는 파라미터값
    useLocation : url 정보
*/
const BoardList = ()=> {
  const [bList, setBList] = useState([]);           //게시물 목록
  const [boardCount, setBoardCount] = useState(0);  //게시물 등록 건수
  const [start, setStart] = useState(0);            //페이지 시작 번호
  const [end, setEnd] = useState(0);                //페이지 종료 번호
  const [pageInt, setPageInt] = useState([]);       //현재 페이지
  const [bottomLine, setBottomLine] = useState([]); //화면에 보여질 페이지번호의 갯수
  const [maxPage, setMaxPage] = useState([]);       //최대 페이지
  const [boardName, setBoardName] = useState([]);   //게시판 이름

  const {boardid} = useParams()  // :boardid 에 해당하는 값
  const location = useLocation();  //http://localhost:5173/board/BoardList/1
  let queryString = location.search; //http://localhost:5173/board/BoardList/1?page=1
                                      // location.search : page=1
  useEffect(()=>{   getBoardList();  },[boardid,queryString])  //화면이 처음 렌더링되면 getBoardList함수 실행, 한번만 실행됨 
                                            // [data] : data값이 변경될때 마다 실행
                                            // 배열값이 없는 경우 : 렌더링시마다 실행

  const getBoardList = () => {   //화면 렌더링시 호출되는 함수
    if (queryString.length === 0) {
        queryString = "?boardid=" + boardid;
    } else {
        queryString += "&boardid=" + boardid;
    }
    fetch("http://localhost:8080/board/boardList" + queryString)   //ajax으로 백엔드 서버와 통신. springboot 서버에서 데이터 수신
      .then((resp)=> resp.json())
      .then((json) => {
        setBList(json.blist);  //bList 변수 변경
        setBoardCount(json.listcount); //boardCount 변수 변경
        setStart(json.start)
        setEnd(json.end)
        setPageInt(json.pageInt)
        setBottomLine(json.bottomLine)
        setMaxPage(json.maxpage)
        setBoardName(json.boardName)
      })
  }

  function getPage(start, end) {
    
    let arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  }

  return (   
    <div className="container-fluid"> {/** JSX 영역  */}
      <div>
        <h2>{boardName}[{boardCount}]</h2>
        <p className="text-right"><Link to={`/board/boardForm/${boardid}`}>게시판등록</Link></p>
        <table className="table ">
          <thead>
            <tr><th>번호</th><th>작성자</th><th>제목</th><th>날짜</th><th>조회수</th><th>파일</th></tr>
          </thead>
          <tbody>
            {Array.isArray(bList) && bList.length > 0 ? (
              bList.map((b, index) => (
                <tr key={index}>
                  <td>{boardCount - (pageInt - 1) * bottomLine - index}</td>
                  <td>{b.name}</td>
                  <td>
                    <a href={"/board/boardInfo/" + b.num}>{b.subject}</a>
                  </td>
                  <td>{dayjs(b.regdate).format("YYYY-MM-DD")}</td>
                  <td>{b.readcnt}</td>
                  <td><img  src={"http://localhost:8080/img/board/" + b.file1} width="30px"  alt="file" />{b.file1}</td>
                </tr> 
              ))) : (  //bList의 데이터가 없는 경우 
              <tr>
                <td colSpan="6" className="text-center">
                  게시물이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        {/** 페이징 부분 */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid justify-content-center">

           <ul className="pagination justify-content-center">
          <li className={pageInt == 1 ? "page-item disabled" : "page-item"}>
            <Link to={`/board/boardList/${boardid}?page=${pageInt - 1}`} className="page-link">Previous</Link></li>
          {getPage(start, end).map((p) => (
            <li key={p} className={pageInt == p ? "page-item active" : "page-item"}>
             <Link  to={`/board/boardList/${boardid}?page=${p}`} className="page-link">{p}</Link></li>
          ))}
          <li className={pageInt == maxPage ? "page-item disabled" : "page-item"}>
            <Link to={`/board/boardList/${boardid}?page=${pageInt + 1}`} className="page-link">Next</Link>
          </li>
        </ul></div></nav></div>
  );
}
export default BoardList;