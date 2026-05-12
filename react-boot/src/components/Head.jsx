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
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
               <div class="container-fluid">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        {props.cook == null && 
                        <li className="navbar-item"><Link to="/member/join" className="nav-link">회원가입</Link> </li> }
                        {props.cook == null && 
                        <li className="navbar-item"><Link to="/member/login"  className="nav-link">로그인</Link> </li> }
                        {props.cook != null && 
                        <li className="navbar-item"><Link to="#" onClick={logout}  className="nav-link">&nbsp;로그아웃&nbsp;</Link> </li> }
                    </ul>
                    <ul  className="navbar-nav">
                        <li className="navbar-item"><Link to="/board/boardList/1" className="nav-link">공지사항</Link> </li>
                        <li className="navbar-item"><Link to="/board/boardList/2" className="nav-link">자유게시판</Link> </li>
                        <li className="navbar-item"><Link to="/board/boardList/3" className="nav-link">QNA</Link> </li>
                    </ul>
                </div>
            </div>
            </nav>
        </div>
    )
}
export default Head;