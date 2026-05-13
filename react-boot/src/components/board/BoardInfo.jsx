import { useState, useEffect } from "react";
import { useLocation, useParams, Link } from 'react-router-dom';
function BoardInfo() {
    const [board,setBoard] = useState({})
    const [boardName,setBoardName] = useState("")
    const location = useLocation();
    let queryString = location.search;
    const { bnum } = useParams();

    const getBoardInfo = () => {
        if (queryString.length === 0) {
            queryString  = "?num=" + bnum;
        }
        fetch("http://localhost:8080/board/boardInfo" + queryString)
        .then((resp)=> resp.json())
        .then((json) => {
            console.log(json)
            setBoard(json.board);
            setBoardName(json.boardName);
        })
    }
    useEffect(()=> {   getBoardInfo()  },[]);

  return (
    <div>
      <div className="container">
        <div className="input-form-backgroud row">
          <div className="input-form col-md-12 mx-auto">
            <h4 className="mb-3">{boardName}-게시판</h4>
            <table className="table">
              <tbody>
              <tr>
                <td>파일</td>
                <td>
                  {board && board.file1 && (
                    <> 
                      {board.file1}
                      <img src={"http://localhost:8080/img/board/" + board.file1}  width="100px"  height="120px" />
                    </>
                  )}
                </td>
              </tr>
              <tr><td>제목</td><td>{board.subject}</td></tr>
              <tr><td>내용</td><td>{board.content}</td></tr>
              <tr><td>날짜</td><td>{board.regdate}</td></tr>
              <tr><td>조회수</td><td>{board.readcnt}</td></tr>
              <tr><td colSpan="2" className="text-right">
                  <Link className="btn btn-primary" to={`/board/boardUpdateForm/${board.num}`}>변경</Link>
                  <Link className="btn btn-primary" to={`/board/boardDeleteForm/${board.num}`}>삭제</Link>
                  <Link className="btn btn-primary" to={`/board/boardList/${board.boardid}`}>목록</Link>
                </td>
              </tr></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );   }
export default BoardInfo;