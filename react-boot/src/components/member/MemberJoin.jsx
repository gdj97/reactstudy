import { useState, useEffect,useRef  } from "react";
import { useNavigate } from 'react-router-dom';

function MemberJoin() {
    const navigate = useNavigate()
	const [id, setId] = useState("");
	const [gname, setGname] = useState("");
	const [pass, setPass] = useState("");
	const [pass2, setPass2] = useState("");
	const [gender, setGender] = useState(1);
	const [email, setEmail] = useState("");
	const [tel, setTel] = useState("");
	const [picture, setPicture] = useState("");
    const passRef = useRef();   
    /**
        useRef : 변경가능한 참조객체.값이 변해도 화면에 렌더링 되지 않는 저장공간. Hook
                pass 태그를 지정 저장. : ref={passRef} 속성 등록
                포커스이동등에 사용됨
     */

	const handleSubmit =  async (e) => {
		e.preventDefault();
        if(pass !== pass2) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
            passRef.current.focus(); //비밀번호 입력창으로 강제 이동
            return;
        }
		try {
			const form = new FormData()
			form.append('id', id)
			form.append('pass', pass)
			form.append('name', gname)
			form.append('gender', gender)
			form.append('tel', tel)
			form.append('email', email)
			form.append('picture', picture)
			const response = await fetch('http://localhost:8080/member/joinPro', {
                method: 'POST',
                body: form,
                headers: { Accept: 'application/json, text/plain, */*'  }
            });	
            if (response.ok) {
                alert("회원가입에 성공했습니다!");
            	navigate("/member/login"); 
        	} else {
            	const errorData = await response.text();
            	alert(`회원가입 실패: ${errorData || "입력 정보를 확인하세요."}`);
        	}	
		} catch (e) {
            alert("서버 전송 오류");
		}
	}
    const win_upload = () => {
        const url = "/member/pictureForm";
        const option= "width=500,height=400,top=100, left=200";
        window.open(url,"",option);
    }
// 컴포넌트가 마운트될 때 window에 함수 등록
    useEffect(() => {
        // 팝업창에서 window.opener.setPicture(...)로 호출할 수 있게 함
        window.setPicture = (fileName) => {
            console.log("팝업으로부터 전달받은 파일명:", fileName);
            setPicture(fileName);
        };
        // 컴포넌트가 언마운트(닫힐 때)될 때 메모리 누수 방지를 위해 삭제
        return () => {
            delete window.setPicture;
        };
    }, []);
	return (
	<div className="container">
		<div className="input-form-backgroud row">
			<div className="input-form col-md-12 mx-auto">
				<h4 className="mb-3">회원가입</h4>
                {/** noValidate : required 기능 안함 */}
				<form className="validation-form"  onSubmit={handleSubmit} method="post" name="f">
					<input type="hidden" name="picture" />
					<div className="row">
						<div className="col-md-3 mb-3">
							<label htmlFor="pic">사진</label> {/** for => htmlFor  */}
							<img src={`http://localhost:8080/member/picture/${picture}`} width="100px" height="120px" onChange={(e) => {setPicture(e.target.value);}}
							   	value={picture}	 id="pic" />
							<button className="btn btn-primary btn-block" onClick={win_upload} >사진업로드</button>
						</div>
						<div className="col-md-9 mb-3">
							<div className="row">
								<div className="col-md-6 mb-3">
									<label >아이디</label>
									<input type="text" className="form-control"	onChange={(e) => {	setId(e.target.value);	}}	
											name="id" value={id}  required/>
								</div>
								<div className="col-md-6 mb-3">
									<label htmlFor="name">이름</label>
									<input type="text"	className={`form-control ${!gname ? 'is-invalid' : ''}`} id="name" placeholder=""
										onChange={(e) => {	setGname(e.target.value); }} value={gname}	name="name"	required />
									<div className="invalid-feedback">이름을 입력해주세요.</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6 mb-3">
							<label htmlFor="pass">비밀번호</label>
							<input type="password"	className={`form-control ${!pass ? 'is-invalid' : ''}`} 
                                    id="pass" placeholder="아이디" required ref={passRef}
									onChange={(e) => {	setPass(e.target.value); }}	value={pass} name="pass" />
							<div className="invalid-feedback">비밀번호을 입력해주세요.</div>
						</div>
						<div className="col-md-6 mb-3">
								<label htmlFor="pass2">비밀번호확인</label>
								<input type="password"	className="form-control" id="pass2" placeholder="" required
									onChange={(e) => {	setPass2(e.target.value);	}}	value={pass2}	name="pass2"  />
								<div className="invalid-feedback">비밀번호확인을 입력해주세요.</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6 mb-3">
							<label htmlFor="gender1">남자</label>
							<input type="radio"	onChange={(e) => {setGender(1);}} checked={gender === 1} required name="gender" id="gender1"/>
						</div>
						<div className="col-md-6 mb-3">
							<label htmlFor="gender2">여자</label>
							<input type="radio"	onChange={(e) => {setGender(2);}}	name="gender" required  id="gender2"/>
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="email">이메일</label>
						<input type="email" name="email" className="form-control" id="email" placeholder="you@example.com"
								onChange={(e) => {	setEmail(e.target.value);	}}	value={email}	required />
						<div className="invalid-feedback">이메일을 입력해주세요.</div>
					</div>
					<div className="mb-3">
						<label htmlFor="tel">전화번호</label>
						<input type="text"	className="form-control" id="tel" placeholder="전화번호"
								onChange={(e) => {	setTel(e.target.value);	}}	value={tel}	name="tel"	required />
						<div className="invalid-feedback">전화번호를 입력해주세요.</div>
					</div>
					<button className="btn btn-primary btn-lg btn-block" type="submit">가입완료</button>
				</form>
			</div>
		</div>
	</div>
);
}
export default MemberJoin;