import { useState } from "react"
import "./com_css/ReviewCreate.css"
import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"

function ReviewCreate() {
    const [subject,setSubject] = useState('')
    const [review,setReview] = useState('')
    const [newfile,setNewFile] = useState([])
    const [previewImg,setPreviewImg] = useState([])
    const [rating, setRating] = useState(0);
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    const [productid,setProductId] = useState(null)

    // 드롭다운
    const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태 관리
    const [selectedOption, setSelectedOption] = useState("상품을 선택해주세요"); // 선택된 옵션

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // 드롭다운 열림/닫힘 토글
    };

    const handleOptionClick = (option,index) => {
        setSelectedOption(option); // 옵션 선택
        setIsOpen(false); // 드롭다운 닫기
        setProductId(index+1)
    };
    const options = ["얼굴", "전신", "등", "목"]; // 드롭다운 옵션 목록


    // 드롭다운

    const handleStarClick = (index) => {
        setRating(index + 1); // 클릭한 별의 인덱스를 1부터 시작하는 별점으로 변환
    };

    const subjectChange = (e) =>{
        if (subject.length > 30){
            return
        }
        else{
            setSubject(e.target.value)
        }
    }

    const reviewChange = (e)=>{
        if (review.length > 400){
            return
        }
        else{
            setReview(e.target.value)
        }


    }

    const fileInputRef = useRef(null);
    
    const imgsendClick = () =>{
        fileInputRef.current.click();

    }
    const handleFileChange = (event) => {
        const imglist = event.target.files
        let imageUrlLists = [...previewImg]
        let imageLists = [...newfile]

        for (let i = 0; i < imglist.length; i++){
            const currentImageUrl = URL.createObjectURL(imglist[i])
            imageUrlLists.push(currentImageUrl)
        }
        for (let i = 0; i < imglist.length; i++){
            const currentImage = imglist[i]
            imageLists.push(currentImage)
        }

        if (imageUrlLists.length > 5){
            imageUrlLists = imageUrlLists.slice(0,5);
            imageLists = imageLists.slice(0,5);
            alert("최대 5장입니다다")
        }
        console.log("preview",imageUrlLists)
        console.log("fileimage",imageLists)
        setPreviewImg(imageUrlLists)
        setNewFile(imageLists)

}
console.log(previewImg)

    const xClick = (index) =>{
        setPreviewImg((prev) => prev.filter((_, i) => i !== index));
        setNewFile((prev) => prev.filter((_, i) => i !== index));
        
    }

    const sendClick = (e) => {
        e.preventDefault();
        if (newfile.length === 0 ){
            alert("사진 한장이상")
            return
        }
        if (review.length === 0 ){
            alert("리뷰를 작성해주세요")
            return
        }
        if (subject.length === 0){
            alert("제목을 작성해주세요")
            return
        }
        if (rating === 0 ){
            alert("별점을 등록해주세요")
            return
        }


        const formData = new FormData();
        formData.append("subject",subject);
        formData.append("stars",rating);
        formData.append("review",review);
        formData.append("product",productid);

        for (let i = 0; i< newfile.length; i++){
            formData.append("images",newfile[i]);
        }
        
        axios.post("/review/review_create",formData,{
            headers:{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`, // JWT 인증 토큰 추가
            }
        })
        .then(()=>{
            console.log("리뷰등록완료",Response.data);
            navigate("/review")
        })
        .catch(()=>{
            alert("리뷰등록 실패패")
        })

    }
    const oClick = (index) => {
        console.log("newfile 상태:", newfile);
        console.log("index 값:", index);
    
        if (!newfile[index]) {
            console.error(`newfile[${index}]가 정의되지 않았습니다.`);
            alert("파일이 없습니다. 새로고침 후 다시 시도하세요.");
            return;
        }
    
        const formData = new FormData();
        formData.append("imgsrc", newfile[index]);
        console.log("file데이터타입",newfile[index].type)
        axios
            .post("/review/mojike_img_create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                responseType: "blob", // Blob 데이터를 응답으로 받음
            })
            .then((response) => {
                const processedBlob = response.data;
                console.log("반환값",response.data)
                // 서버에서 반환된 Blob 데이터를 새로운 File 객체로 변환
                const processedFile = new File(
                    [processedBlob],
                    `processed_${newfile[index].name}`, // 새로운 파일 이름 설정
                    { type: newfile[index].type }
                );
                console.log("파일형식으로 저장장",processedFile)
                // newfile 상태 업데이트
                setNewFile((prevNewFile) => {
                    const updatedNewFile = [...prevNewFile];
                    updatedNewFile[index] = processedFile; // 업데이트된 파일로 교체
                    return updatedNewFile;
                });
    
                // 미리보기 이미지 업데이트
                const imageUrl = URL.createObjectURL(processedBlob);
                setPreviewImg((prevPreviewImg) => {
                    const updatedPreviewImg = [...prevPreviewImg];
                    updatedPreviewImg[index] = imageUrl;
                    return updatedPreviewImg;
                });
            })
            .catch((error) => {
                console.error("이미지 처리 에러:", error);
            });
    };
    
    
    
    return (
        // 회색 배경
        <div className="container-box"> 
        {/* 회색배경 */}
        <div className="subject-box">
            <input type = "text" onChange={subjectChange} maxLength={30} placeholder="리뷰제목을 입력해주세요!"></input>
        </div>
        <div className="productid-box">
            <div className="dropdown" onClick={toggleDropdown}>
                <div className="dropdown-header">
                    {selectedOption}
                    <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
                </div>
                {isOpen && (
                    <ul className="dropdown-menu">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className="dropdown-item"
                                onClick={() => handleOptionClick(option,index)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        
        <div className="img-box">
        <span>{newfile.length}/5</span>
        {
        newfile.length === 0 ? (
            <div>
            <h1>사진을 추가해 주세여</h1>
            <div className="product-cotainer " onClick={imgsendClick}>
                <i class="fas fa-plus"></i>
                <input
                    type="file"
                    multiple="multiple"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </div>
            </div>
        ):
        (
            <div style ={{display:"flex", width:"100%"}}>
                {previewImg.map((imgSrc, index) => (
                    <div style={{marginLeft:"10px"}}>
                    <span style = {{cursor:"pointer"}}onClick={()=>{xClick(index)}}>X</span>
                    <span style = {{cursor:"pointer"}}onClick={()=>{oClick(index)}}>O</span>
                    <img key={index} src={imgSrc} alt={`Preview ${index}`} style={{ width: "80px", height: "80px", margin: "5px" }} />
                    </div>

                ))}


                <div className="product-cotainer " onClick={imgsendClick} style={{marginRight:"10px"}}>
                <div style ={{marginLeft:"auto"}}>
                <i class="fas fa-plus"></i>
                <input
                    type="file"
                    multiple="multiple"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                </div>
                </div>
            </div>
        )
    }
        </div>
        <div className="review-box">
            <textarea maxLength={400} onChange={reviewChange} placeholder="리뷰를 작성해주세요!" ></textarea>
            <span>{review.length}/400</span>
        </div>
        <p style={{marginBottom:"1px", color:"black",fontSize:"30"}}>별점을 표시해주세요!</p>
        <div className="stars-box" >
            {Array.from({ length: 5 }).map((_, index) => (
                <i
                    key={index}
                    style={{color:"rgb(167, 122, 122)",cursor:"pointer"}}
                    className={`star ${index < rating ? "fas fa-star" : "far fa-star"}`}
                    onClick={() => handleStarClick(index)}
                ></i>
            ))}
        </div>
        <div className="button-box" >
            <button onClick={sendClick}>등록</button>
        </div>

        </div>
        
    )
}

export default ReviewCreate