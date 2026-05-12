import { Link } from "react-router-dom";
export default function NotFoundPage() {
    return (
        <>
         <h2>잘못된 요청입니다.</h2>
         <Link to="/">돌아가기</Link>
        </>
    )
}