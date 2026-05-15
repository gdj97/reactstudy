// 댓글 정보만 컴포넌트로 설정
import { useState, useEffect,useCallback } from "react";
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs'

function Comment({bnum,cList}) {
    const navigate = useNavigate();
    const [writer, setWriter] = useState("");
    const [pass, setPass] = useState("");
    const [content, setContent] = useState("");
    const [seq, setSeq] = useState("");

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
    <>
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
    </>
  )
}
export default Comment;