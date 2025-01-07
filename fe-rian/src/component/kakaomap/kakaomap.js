import { useEffect } from "react";

function KakaoMap() {
  useEffect(() => {
    const loadMap = () => {
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

      // 화면 크기 변경 시 맵 갱신
      window.addEventListener("resize", () => {
        map.relayout();
      });
    };

    if (window.kakao && window.kakao.maps) {
      loadMap();
    } else {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
    }

    return () => {
      window.removeEventListener("resize", () => {
        map.relayout();
      });
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}

export default KakaoMap;
