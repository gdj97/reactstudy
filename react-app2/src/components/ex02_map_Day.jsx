import data from "../db/data.json"
export default function Day() {
    const day = 4
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
    const wordlist = data.words.filter(word=>(word.day===day))
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