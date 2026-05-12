// data의 days 키값만 <li>태그로 출력하기
// ./components/ex03_route_DayList.jsx
import { Link } from "react-router-dom"
/*
   Link : a 태그와 기능이 비슷함. Route에 설정된 컴포넌트로 변경
      a : url 변경하여 화면을 호출함
*/
import data from "../db/data.json"   // .. :상위폴더. src 폴더
//data : data.json 파일의 내용 객체로 저장
export default function DayList() {
    return (
        <ul className="list_day">
{/**
"days": [
    { "id": 1,  "day": 1  },
    { "id": 2,  "day": 2  },
    { "id": 3,  "day": 3  },
    { "id": 4,  "day": 4  }
  ]
map : 반복문. 요소들을 순회 
 */}
            {data.days.map(day => (
                <li key={day.id}>
                    <Link to={`/day/${day.day}`}>Day {day.day}</Link>
                </li>
            ))}
        </ul>
    )
}