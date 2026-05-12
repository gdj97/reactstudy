// data의 days 키값만 <li>태그로 출력하기
// ./components/ex02_map_DayList.jsx
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
day : { "id": 1,  "day": 1  } => days 배열객체에 한개의 요소객체
 */}
            {data.days.map(day => (
                <li key={day.id}>Day {day.day}</li>
            ))}
        </ul>
    )
}