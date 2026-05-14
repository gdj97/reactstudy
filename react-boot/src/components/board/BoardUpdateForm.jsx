import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
function BoardUpdateForm () {
    const navigate = useNavigate();
    const [num, setNum] = useState("");
    const [gname, setGname] = useState("");
    const [pass, setPass] = useState("");
    const [subject, setSubject] = useState("");  
    const [content, setContent] = useState("");
    const [file1, setFile1] = useState(""); 
    const [boardid, setBoardid] = useState("");    
    const { bnum } = useParams(); 
    const location = useLocation();
    let queryString = location.search;
 
const getBoardInfo = () => {
        if (queryString.length === 0) {
           queryString = "?num=" + bnum;
        }
        fetch("http://localhost:8080/board/boardUpdateForm" + queryString)
          .then((resp) => resp.json())
          .then((json) => {
            setNum(json.board.num); 
            setGname(json.board.name);
            setSubject(json.board.subject);
            setContent(json.board.content);
            setFile1(json.board.file1);
            setBoardid(json.board.boardid)
        });
    };
useEffect(() => {   getBoardInfo();  }, []);

}
export default BoardUpdateForm;
