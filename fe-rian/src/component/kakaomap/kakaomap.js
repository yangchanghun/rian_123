import { useEffect } from "react";

function KakaoMap() {
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.60328, 126.91494),
        level: 1,
      };
      const map = new window.kakao.maps.Map(container, options);
      const marker = new window.kakao.maps.Marker({
        position: map.getCenter(),
      });
      marker.setMap(map);
    } else {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
    }
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}

export default KakaoMap;
