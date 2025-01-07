import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function KakaoCallback({set로그인}) {
    const navigate = useNavigate();
    const [isProcessed, setIsProcessed] = useState(false); // 요청 상태 관리
    
    useEffect(() => {
        if (isProcessed) return; // 요청이 이미 처리되었는지 확인

        const code = new URL(window.location.href).searchParams.get("code");
        if (!code) {
            alert("잘못된 접근입니다.");
            navigate("/");
            return;
        }

        setIsProcessed(true); // 요청 처리 시작
        axios
            .get(`/api/kakaologin?code=${code}`)
            .then((response) => {

                if (response.data.kakao == true){
                    localStorage.setItem('token',response.data.access);
                    localStorage.setItem('name',response.data.user.real_name);
                    set로그인('로그아웃')
                    navigate('/')
                }
                else if (response.data.kakao==false){
                    console.log(response.data.kakao);
                    navigate('/kakao/signup',{state:{userData:response.data.profile_data,social_id:response.data.social_id}});
                }

                // console.log("응답 데이터:", response.data.profile_data,"정보여부:",response.data.kakao,"토쿤:",response.data.access_token,"profile",response.data.profile);
                // navigate("/");
            })
    }, [isProcessed, navigate]);

    return <div></div>;
}

export default KakaoCallback;
