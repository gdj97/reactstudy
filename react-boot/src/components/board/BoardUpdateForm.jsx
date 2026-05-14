import { useState, useCallback, useEffect } from "react";
/** 
    react 기본 Hook
    useState : 데이터값 관리
    useEffect : 함수의 실행 시점 관리
    useCallback : 함수의 재사용. 함수 자체를 메모리에 저장하여 재 생성 방지. 
 */
import { useNavigate, useLocation, useParams } from 'react-router-dom'; //npm install react-router-dom
/** 
    react router Hook
    useNavigate : 다른 페이지로 이동 기능
    useLocation : URL 정보 저장
       search : ?이후의 정부
       그외 pathname, hash, state, key 
    useParams : 파라미터 정보 저장  :aaa 
 */
function BoardUpdateForm () {
    const navigate = useNavigate();
    const [num, setNum] = useState("");  //게시판번호
    const [gname, setGname] = useState("");  //글쓴이
    const [pass, setPass] = useState("");
    const [subject, setSubject] = useState("");  //제목
    const [content, setContent] = useState(""); //내용
    const [file1, setFile1] = useState("");    //첨부파일
    const [boardid, setBoardid] = useState("");   //게시판 종류 
    const { bnum } = useParams();    // 게시판번호를 url에서 파라미터 정보 저장
    const location = useLocation();
    let queryString = location.search;  //url에서 ?이후의 문자열
 
const getBoardInfo = () => {   //게시물 상세 정보 요청
        if (queryString.length === 0) {
           queryString = "?num=" + bnum;
        }
        fetch("http://localhost:8080/board/boardUpdateForm" + queryString)
          .then((resp) => resp.json())
          .then((json) => {  // 게시물의 상세정보를 읽어 화면에 표시할 변수에 저장
            setNum(json.board.num); 
            setGname(json.board.name);
            setSubject(json.board.subject);
            setContent(json.board.content);
            setFile1(json.board.file1);
            setBoardid(json.board.boardid)
        });
    };
useEffect(() => {   getBoardInfo();  }, []);  //화면이 시작시 getBoardInfo 함수 실행

//submit 버튼 클릭시 호출됨.
/*
   useCallback(함수,[]) => 
    함수 : 실행할 함수
    [data] : 생성되는 시기. data 값이 변경될때 함수 생성
*/

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    let fileinput = document.querySelector("#file");
    try {
      const form = new FormData();
      form.append('num', bnum);
      form.append('name', gname);
      form.append('pass', pass);
      form.append('subject', subject);
      form.append('content', content);
      form.append('file1', file1);
      form.append('file2', fileinput.files[0]);
      form.append('boardid', boardid);
      fetch('http://localhost:8080/board/boardUpdatePro', {
        method: 'POST',
        body: form,
      })
      .then((resp)=>resp.json())
      .then((json)=> {
        //alert(json.msg)  //결과 메세지. => 화면에 빨간글씨로 변경하기
        document.querySelector("#msg").innerHTML = json.msg;
        if(json.code === 0) {  //서버에서 code=0 인경우가 수정 완료상태. 
           navigate("/board/boardInfo/" +bnum); //게시물 상세 정보로 리다렉트
        }
      });

    } catch (e) {
      console.error("업데이트 실패:", e);
    }
  }, [gname, pass, subject, content, boardid,navigate]); //gname, pass,.... 변수의 값이 변경될때 함수를 메모리 생성
  return (
    <div className="container">
      <h4 className="text-center">게시판 수정</h4>
      <div id="msg" className="text-danger text-left"></div>
      <form  className="container"  method="post"   encType="multipart/form-data" onSubmit={handleSubmit} >
        <input type="hidden" name="num" value={bnum} /> 
        <input type="hidden" name="file1" value={file1} /> {/** 수정전 첨부파일의 이름 */}
        <div className="form-group">
          <label htmlFor="name">작성자:</label>
          <input type="text" className="form-control"     placeholder="Enter name"
            id="name"    onChange={(e) => setGname(e.target.value)}   value={gname}   name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">비밀번호:</label>
          <input  type="password"   className="form-control"   placeholder="Enter password"
                  id="pwd"   onChange={(e) => setPass(e.target.value)}  value={pass} name="pass" />
        </div>
        <div className="form-group">
          <label htmlFor="subject">제목:</label>
          <input  type="text"   className="form-control"   placeholder="제목 입력"   id="subject"
            onChange={(e) => setSubject(e.target.value)}   value={subject}          name="subject" />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용:</label>
          <textarea      className="form-control"   rows="5"   id="content"
          onChange={(e) => setContent(e.target.value)}       value={content}  name="content"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="file">파일:&nbsp;{file1}</label>
          <input type="file" className="form-control"  id="file"
            onChange={(e) => {  setFile1(e.target.value); }}     name="f"  />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form> </div>
  );
}
export default BoardUpdateForm;
