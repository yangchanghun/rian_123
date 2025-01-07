import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./com_css/kakaosignup.css"
import axios from "axios";
function KakaoSignup() {
    const location = useLocation();
    const userData = location.state?.userData;
    const socialId = location.state?.social_id;
    const navigate = useNavigate();

    const nickname = userData.nickname
    const email = userData.email
    const [pn,setPn] = useState()


    console.log(userData)
    useEffect(() => {
        // socialId가 없으면 홈으로 리다이렉트
        if (!socialId || !userData) {
            navigate('/');
        }
    }, [socialId, userData, navigate]); // 의존성 배열에 추가

    // 데이터가 없으면 아무것도 렌더링하지 않음
    if (!socialId || !userData) {
        return null;
    }



    // 데이터가 유효한 경우 렌더링

    const phChange = (e) =>{
        setPn(e.target.value)
    }

    const sendClick = (e) =>{
        e.preventDefault();
            axios.post(
                "/api/kakaosignup/", // 요청 URL
                { 
                  email: email, 
                  phone_number:pn,
                  real_name : nickname,
                  social_id:socialId
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              ).then((response)=>{
                console.log(response.data)
                navigate('/')
              })
    }

    return (
        <div className="all-box">

            {/* <div>{userData?.nickname}</div>
            <div>{userData?.email}</div>
            <div>real_name: 양창훈</div>
            <div>email: gory4848@naver.com</div>
            <div>phone_number: 01077603582</div> */}
            <form className="form-box"> 
                <div className="box">
                <div>
                    <h1>회원가입</h1>
                    <p1>회원이 되어 다양한 혜택을 경험해 보세요!</p1>
                </div>
                <div className="name-box">
                    <div>이름</div>
                    <input value={userData.nickname} readOnly />
                </div>
                <div className="name-box">
                    <div>EMAIL</div>
                    <input value={userData.email} readOnly />
                </div>
                <div className="name-box">
                    <div>전화번호</div>
                     <input type="number" onChange={(e) => phChange(e)}></input>
                </div>                
                <button onClick={(e)=>sendClick(e)}>가입완료</button> 
                <button>가입취소</button>
                </div>
            </form>
        </div>
    );
}

export default KakaoSignup;