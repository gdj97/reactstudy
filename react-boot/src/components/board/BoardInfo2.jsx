import { useState, useEffect,useCallback } from "react";
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
//게시물 상세 정보 + 댓글정보
import dayjs from 'dayjs'

function BoardInfo() {
    const navigate = useNavigate();
    const [board,setBoard] = useState({}) //게시물데이터
    const [boardName,setBoardName] = useState("")  //게시판이름

    const [cList, setCList] = useState([]);           //댓글 목록
    //댓글 등록
    const [writer, setWriter] = useState("");
    const [pass, setPass] = useState("");
    const [content, setContent] = useState("");
    const [seq, setSeq] = useState("");

    const location = useLocation();
    let queryString = location.search;
    const { bnum } = useParams();

    const getBoardInfo = () => {
        if (queryString.length === 0) {
            queryString  = "?num=" + bnum;
        } else {
            queryString  += "&num=" + bnum;
        }
        fetch("http://localhost:8080/board/boardInfo" + queryString)
        .then((resp)=> resp.json())
        .then((json) => {
            setBoard(json.board);
            setBoardName(json.boardName);
            setCList(json.clist);  //댓글 목록
        })
    }
    useEffect(()=> {   getBoardInfo()  },[queryString]);

const commentSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('num', bnum);
      form.append('writer', writer);
      form.append('pass', pass);
      form.append('content', content);
      fetch('http://localhost:8080/board/CommentPro', {
        method: 'POST',
        body: form
      })
      .then((resp)=>resp.json())
      .then((json)=> {
        console.log(json)
        //alert(json.msg)  //결과 메세지. => 화면에 빨간글씨로 변경하기
        document.querySelector("#comment").innerHTML = json.msg;
        if(json.code === 0) {  //서버에서 code=0 인경우가 수정 완료상태. 
           const now = Date.now();  //현재까지의 밀리초 리턴
           //?t=" + now : url 정보가 같은 경우 springboot를 요청안함.
           //             url 정보를 변경하도록 추가함. 의미없는 파라미터
           navigate("/board/boardInfo/" +bnum + "?t=" + now); //게시물 상세 정보로 리다렉트
        }
      });
    } catch (e) {
      console.error("업데이트 실패:", e);
    }
  }, [pass, content]); 

const commentDelete =useCallback(async (e)  => {
    e.preventDefault();
    try {
      const formEl = e.target;  //form 객체
      const form = new FormData();
      form.append('num', formEl.num.value);
      form.append('seq', formEl.seq.value);
      form.append('pass', formEl.pass.value);
      // FormData 객체의 파라미터값을 콘솔에 출력 하기 => 삭제
      // for (const [key, value] of form.entries()) {
      //   console.log(key, value);
      // }
      fetch('http://localhost:8080/board/CommentDelete',{
        method: 'POST',
        body: form
      })
      .then((resp)=>resp.json())
      .then((json)=> {
        console.log(json)
        document.querySelector("#comment").innerHTML = json.msg;
        if(json.code === 0) {
           const now = Date.now();
           navigate("/board/boardInfo/" +bnum + "?t=" + now); //게시물 상세 정보로 리다렉트
        }
      });
    } catch (e) {
      console.error("업데이트 실패:", e);
    }
  },[seq] ); 

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
  {/** 댓글 부분 */}
  <span id="comment"></span> 
  <form  method="post" name="commForm" onSubmit={commentSubmit}>
  <input type="hidden"  name="num"  value={bnum} />
  <div className="row"> 
    <div className="col text-center">
     <input type="text" id="writer" className="form-control"  placeholder="작성자" onChange={(e) => setWriter(e.target.value)} /></div>
    <div className="col text-center">
    <input type="password" id="pass" className="form-control"  placeholder="비밀번호" onChange={(e) => setPass(e.target.value)} /></div>
    <div className="col text-center">
     <input type="text" id="content" className="form-control" placeholder="댓글내용" onChange={(e) => setContent(e.target.value)} /></div>
    <div className="col text-center"><button  className="btn btn-primary" >댓글등록</button></div>
   </div>
  </form>

  <div className="container">
   <table className="table table-bordered">
    <colgroup>
      <col style={{width: "5%"}} />
      <col style={{width:"10%"}} />
      <col style={{width:"40%"}} />
      <col style={{width:"20%"}} />
      <col style={{width:"20%"}} />
    </colgroup>
    <tbody>
    {Array.isArray(cList) && cList.length > 0 ? (
      cList.map((c, index) => (
        <tr key={c.seq}><td>{c.seq}</td><td>{c.writer}</td><td>{c.content}</td>
        <td>{dayjs(c.regdate).format("YYYY-MM-DD HH:mm:ss")}</td>
        <td className="text-right">       
        <form method="post" className="d-flex justify-content-end align-items-center" onSubmit={commentDelete}>
          <input type="hidden" name="num" value={bnum} />
          <input type="hidden" name="seq" value={c.seq} />
          <input type="password" name="pass" placeholder="비밀번호" className="form-control mr-1"  />
          <button className="btn btn-sm btn-outline-danger text-nowrap">삭제</button>
        </form></td></tr>
      ))) : (
        <tr key={1}><td colSpan="5">등록된 댓글이 없습니다.</td></tr>
      )}
    </tbody>
    </table>
    </div>
    </div>
  );   
}
export default BoardInfo;