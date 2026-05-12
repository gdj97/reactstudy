import data from "../db/data.json"
//  ./components/ex03_route_Day.jsx
import { useParams } from "react-router-dom" 

export default function Day() {
    // <Route path="/day/:day" element={<Day />} /> 
    //  http://...../day/1  => :day 의 값 1 설정됨 
    //useParams : url에 제공하는 파라미터를 리턴. 문자열 형식으로 리턴
    //   :day 파라미터
    //    day : 1 값이 저장
    const {day} = useParams(); //url 형식의 파라미터값 전달
    /**
     * data.words : 배열객체
       filter : 조건에 맞는 객체만 선별. 
                word : 
        {
            "day": 3,
            "eng": "window",
            "kor": "창문",
            "isDone": false,
            "id": 7
        }
       wordlist : day : 3인 word 객체들 
     */
    const wordlist = data.words.filter(word=>(word.day===Number(day)))
    return (
        <>
        <h2>Day{day}</h2>
        <table>
            <tbody>
                {wordlist.map(word => (
                    <tr key={word.id}>
                        <td>{word.eng}</td>
                        <td>{word.kor}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}