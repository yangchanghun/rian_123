import { useEffect } from "react";

const { kakao } = window

function KakaoMap(){

    useEffect(()=>{
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.60328, 126.91494), //지도의 중심좌표.
            level: 1 //지도의 레벨(확대, 축소 정도)
        };
        
        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        var marker = new kakao.maps.Marker({ 
            // 지도 중심좌표에 마커를 생성합니다 
            position: map.getCenter() 
        }); 
        marker.setMap(map);
    })


    return(
        <div className="kakaomap" id="map" ></div>
    )
}

export default KakaoMap