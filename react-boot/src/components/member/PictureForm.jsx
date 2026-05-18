import { useState } from 'react';

function PictureForm() {
    const [previewSrc, setPreviewSrc] = useState(null);

    // 2. 파일 선택 시 실행될 핸들러 (JSP의 change 이벤트 리스너 역할)
    const handleFileChange = (e) => {
        const files = e.target.files; // e.target.files는 선택된 파일들 배열

        if (files && files[0]) {
            const reader = new FileReader();

            // 파일 읽기가 완료되었을 때 실행될 콜백
            reader.onload = (event) => {
                // 결과값(DataURL)을 상태에 저장 -> 리액트가 자동으로 img 태그 갱신
                setPreviewSrc(event.target.result);
            };

            // 선택된 첫 번째 파일을 Data URL 형식으로 읽기
            reader.readAsDataURL(files[0]);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 기본 제출 동작 방지
        // 1. 파일이 선택되었는지 확인
        const fileInput = document.getElementById('imageFile');
        if (!fileInput.files[0]) {
            alert("파일을 선택해주세요!");
            return;
        }

        // 2. FormData 객체 생성 및 파일 담기
        const formData = new FormData();
        formData.append('picture', fileInput.files[0]); // 서버에서 받을 파라미터명: 'picture'
        try {
            fetch('http://localhost:8080/member/picture', {
            method: 'POST',
            body: formData,
            })
            .then(resp=>resp.json())
            .then(json=>{
                alert("사진이 등록되었습니다.=>" + json.picture);
                if (window.opener && !window.opener.closed) {
                    window.opener.setPicture(json.picture); 
                    window.close();
                }
            })
        } catch (error) {
            console.error("Error:", error);
            alert("통신 오류가 발생했습니다.");
        }
    };
    return (
        <div style={{ padding: "20px" }}>
            <table>
                <tbody>
                    <tr>
                        <td align="center">
                            {/* previewSrc가 있으면 출력, 없으면 기본 텍스트나 placeholder 출력 */}
                            {previewSrc ? (
                                <img 
                                    id="preview" 
                                    src={previewSrc} 
                                    alt="미리보기" 
                                    style={{ width: '200px', height: '250px', objectFit: 'cover', border: '1px solid #ddd' }} 
                                />
                            ) : (
                                <div style={{ width: '200px', height: '250px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    사진을 선택하세요
                                </div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {/* action 경로는 실제 백엔드 API 주소에 맞게 수정 필요 */}
                            <form   onSubmit={handleSubmit}>
                                <input type="file" name="picture" id="imageFile" accept="image/*" onChange={handleFileChange}   />
                                <button  className="btn btn-primary" >사진등록</button>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PictureForm;