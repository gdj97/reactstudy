// 게시물 상세조회 + 댓글 정보 : 컴포넌트로 처리하기

import { useState, useEffect,useCallback } from "react";
import { useLocation, useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs'

import Comment from "./Comment.jsx"

function BoardInfo() {
    const [board,setBoard] = useState({})
    const [boardName,setBoardName] = useState("")
    const [cList, setCList] = useState([]);           //댓글 목록

    const location = useLocation();
    let queryString = location.search;
    const { bnum } = useParams();

    if (queryString.length === 0) {
        queryString  = "?num=" + bnum;
    } else {
        queryString  += "&num=" + bnum;
    }
    const getBoardInfo = () => {
        fetch("http://localhost:8080/board/boardInfo" + queryString)
        .then((resp)=> resp.json())
        .then((json) => {
            setBoard(json.board);
            setBoardName(json.boardName);
            setCList(json.clist);  //댓글 목록
        })
    }
    useEffect(()=> {   getBoardInfo()  },[queryString]);
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
              <tr><td>작성자</td><td>{board.name}</td></tr>
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
      {/** Comment 컴포넌트에 2개의 props 전달. Comment(props)로 설정되어야함  */}
      <Comment 
        bnum={bnum}
        cList={cList}
       />
    </div>
  );   
}
export default BoardInfo;