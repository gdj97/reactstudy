import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom'; //npm install react-router-dom
function BoardDeleteForm () {
    const navigate = useNavigate();
    const [num, setNum] = useState("");  //게시판번호
    const [pass, setPass] = useState("");
    const [subject, setSubject] = useState("");  //제목
    const [content, setContent] = useState(""); //내용
    const [boardid, setBoardid] = useState("");  //게시판 종류
    const { bnum } = useParams();    // 게시판번호를 url에서 파라미터 정보 저장
    const location = useLocation();
    let queryString = location.search;  //url에서 ?이후의 문자열
 
const getBoardInfo = () => { 
        if (queryString.length === 0) {
           queryString = "?num=" + bnum;
        }
        fetch("http://localhost:8080/board/boardUpdateForm" + queryString)
          .then((resp) => resp.json())
          .then((json) => { 
            setNum(json.board.num); 
            setSubject(json.board.subject);
            setContent(json.board.content);
            setBoardid(json.board.boardid);
        });
    };
useEffect(() => {   getBoardInfo();  }, []);

const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
        const form = new FormData();
        form.append('num', bnum);
        form.append('pass', pass);
        fetch('http://localhost:8080/board/boardDeletePro', {  method: 'POST',    body: form  })
        .then((resp)=>resp.json())
        .then((json)=> {
//        alert(json.msg)
            document.querySelector("#msg").innerHTML = json.msg;
            if(json.code === 0) {
                navigate("/board/boardList/"+json.boardid);
            }
        });
    } catch (e) {
        console.error("업데이트 실패:", e);
    }
}, [pass]);
return (
    <div className="container">
    <h4 className="text-center">게시판 삭제</h4>
    <div id="msg" className="text-danger text-left"></div>
    <form  className="container"  method="post"  onSubmit={handleSubmit} >
        <input type="hidden" name="num" value={bnum} />
        <div className="form-group">
          <label htmlFor="subject">제목:</label>
          <input  type="text" readOnly  className="form-control"   placeholder="제목 입력"   id="subject"
               value={subject}     name="subject" />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용:</label>
          <textarea    readOnly  className="form-control" rows="5" id="content"  value={content}  name="content"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="pwd">비밀번호:</label>
          <input  type="password"   className="form-control"   placeholder="Enter password"
                  id="pwd"   onChange={(e) => setPass(e.target.value)}  value={pass} name="pass" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form> </div>
  );
}
export default BoardDeleteForm;
