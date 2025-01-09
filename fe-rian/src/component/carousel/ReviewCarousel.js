import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './reviewcarousel.css'
import mongmong from './mongmong.jpg';  // 이 이미지는 사용되지 않는 것 같지만, 필요하면 코드에 포함하세요
import { useEffect, useState } from 'react';
import axios from 'axios';

function ReviewCarousel() {
    const [results, setResults] = useState([]);
    const [resultLength, setResultLength] = useState();

    // 데이터 가져오기
    useEffect(() => {
        axios.get("/review/review_id_list")
        .then((response) => {
            console.log(response.data);
            if (Array.isArray(response.data)) {
                setResults(response.data);
                setResultLength(response.data.length);
            } else {
                console.error("Expected an array but got:", response.data);
                // 예외 처리 (예: 빈 배열로 초기화)
                setResults([]);
                setResultLength(0);
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);

    // 슬라이더 설정
    const settings = {
        className: "slider-items",
        infinite: true, // 슬라이더가 끝없이 반복
        speed: 500, // 전환 속도
        slidesToShow: 3, // 화면에 표시되는 슬라이드 수
        slidesToScroll: 1, // 한 번에 넘기는 슬라이드 수
        arrows: false, // 화살표 비활성화
        autoplay: true, // 자동 재생 활성화
        autoplaySpeed: 3000, // 자동 재생 간격 (3초)
    };

    return (
        <div className="slider-wrapper" style={{ width: '80%', margin: '0 auto' }}>
            <Slider {...settings}>
                {results.length > 0 ? (
                    results.map((a, b) =>
                        a.images && a.images.length > 0 ? (
                            <div key={b} className='slider-item'>
                                <div className='slider-item-gradient'></div>
                                <img src={`${a.images[0].image}`} alt={`이미지 ${b + 1}`} />
                                <p className="card-text" style={{ width: "90%", textAlign: "left", marginLeft: "none", marginBottom: "2px" }}>
                                    {a.review.length > 50 ? (
                                        a.review.slice(0, 50) + "..."
                                    ) : (
                                        a.review
                                    )}
                                </p>
                                <div style={{ height: "50px" }}>
                                    <p className="star-box" style={{ marginTop: "30px" }}>
                                        {Array.from({ length: a.stars }).map((_, index) => (
                                            <i
                                                key={index}
                                                style={{ color: "rgb(167, 122, 122)", cursor: "pointer", float: "left" }}
                                                className="star fas fa-star"
                                            ></i>
                                        ))}
                                        {5 - a.stars ? Array.from({ length: 5 - a.stars }).map((_, index) => (
                                            <i
                                                key={index}
                                                style={{ color: "rgb(167, 122, 122)", cursor: "pointer", float: "left" }}
                                                className="star far fa-star"
                                            ></i>
                                        )) : null}
                                    </p>
                                </div>
                            </div>
                        ) : null
                    )
                ) : null}
            </Slider>
        </div>
    );
}

export default ReviewCarousel;


// {[...Array(6)].map((_, index) => (
//     <div key={index} className="slider-item">
//         <div className="slider-item-gradient"></div>
//         <img src={mongmong} alt={`리뷰 이미지 ${index + 1}`} />
//         <p>ㅎㅇ</p>
//     </div>
// ))}