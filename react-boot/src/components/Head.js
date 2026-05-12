import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie'; //npm install react-cookie
function Head(props) {
    const [, , removeCookie ] = useCookies();
    const logout = ()=> {
        removeCookie("id", { path: '/' })
        window.location.href="/member/login";
    }
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <div>
                    <ul>
                        {props.cook == null && 
                        <li><Link to="/member/join">회원가입</Link> </li> }
                        {props.cook == null && 
                        <li><Link to="/member/login">로그인</Link> </li> }
                        {props.cook != null && 
                        <li><Link to="#" onClick={logout}>&nbsp;로그아웃&nbsp;</Link> </li> }
                    </ul>
                    <ul>
                        <li><Link to="/board/boardList/1">공지사항</Link> </li>
                        <li><Link to="/board/boardList/2">자유게시판</Link> </li>
                        <li><Link to="/board/boardList/3">QNA</Link> </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}