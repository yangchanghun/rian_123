// import { useState,useEffect } from "react"
// import axios from "axios"
// import "./main.css"
// function Carousel({id}){


//     const [name,setName]= useState('')
//     const [img,setImg] = useState([])
//     const [review,setReview] = useState('')
//     const [comment,setComment] = useState('')
//     const [stars,setStars] = useState('')
//     const [subject,setSubject] = useState('')


//     useEffect(()=>{
//         axios.get(`http://127.0.0.1:8000/review/detail/${id}`).then((response)=>{
//             console.log(response.data.user_name)
//             console.log(response.data)
//             setName(response.data.user_name)
//             const imglist = []
//             if (response.data.images && response.data.images.length > 0) {
//                 for (let i = 0 ; i < response.data.images.length ; i ++) {
//                     imglist.push(response.data.images[i])
//                 }
//                 // setImg(response.data.images[0].image);
//             } else {
//                 setImg(null); // 이미지가 없을 경우 null로 설정
//             }
//             setImg(imglist)
//             setComment(response.data.comment)
//             setReview(response.data.review)
//             setStars(response.data.stars)
//             setSubject(response.data.subject)
//         })
//     },[]) 
// return(
//     <div>
//     {img.length>0 ? (
//         <div>
//     <div style={{overflow:"hidden",width:"100%",height:"100%"}}>
//     <div className="container">
//         <div className="inner">
//             <img src = {`http://127.0.0.1:8000${img[0].image}`}></img>
//         </div>
//         <div className="inner">
//             <img src = {`http://127.0.0.1:8000${img[0].image}`}></img>
//         </div>
//         <div className="inner">
//             <img src = {`http://127.0.0.1:8000${img[0].image}`}></img>
//         </div>
//     </div>
//     </div>
// <button className="btn-1">1</button>
// <button className="btn-2">2</button>
// <button className="btn-3">3</button>
// </div>
//     )
//     :
//     (
//         null
//     )
//     }

//     </div>
// )
// }

// export default Carousel
import "./main.css";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Carousel = ({ id }) => {
  const [img, setImg] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    axios.get(`/review/detail/${id}`).then((response) => {
      const images = response.data.images || [];
      setImg(images);
      setName(response.data.user_name || "");
      setComment(response.data.comment || "");
      setReview(response.data.review || "");
      setStars(response.data.stars || "");
      setSubject(response.data.subject || "");
    });
  }, [id]);
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          borderRadius: "50%",
          left: "10px",
        }}
        onClick={onClick}
      />
    );
  };
  
  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          borderRadius: "50%",
          right: "10px",
        }}
        onClick={onClick}
      />
    );
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    infinite: img.length > 1, // 이미지가 한 개일 때 무한 스크롤 비활성화
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,

  };

  return (
      <Slider {...settings}>
        {img.length > 0 ? (
          img.map((image, index) => (
            <div key={index}>
              <img
                style={{ width: "400px", height: "500px",boxSizing:"border-box" }}
                src={`${image.image}`}
                alt={`Slide ${index}`}
              />
            </div>
          ))
        ) : (
            null
        )}
      </Slider>
  );
};

export default Carousel;
