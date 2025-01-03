import React from "react";
import KakaoMap from "./kakaomap/kakaomap";
import "./com_css/Positioncss.css"; // Position 전용 CSS 가져오기

function Position() {
    return (
<div className="container-rgb51">
<div className="map">
    <div className="address">
    </div>
    <KakaoMap />
</div>
<div className="description-box">
<p className="">
        <span className="bold">주소</span> <span></span><span>서울 은평구 연서로3가길 10</span>
    </p>

    <p className="tel">
        <span className="bold">연락처</span> <span></span><span>02-383-5656</span>
    </p>
    <p className="time">
        <span className="bold">영업시간</span> <span></span><span>08:00~20:00</span>
    </p>
    <div className='ready-bg'></div>
    <div style={{width:"500px", textAlign:"left" ,marginTop:'20px'}}>
    <a  href='/reservation' className="res-btn"><span >상담예약 하러가기</span></a>
    </div>
</div>
</div>
    );
}

export default Position;
