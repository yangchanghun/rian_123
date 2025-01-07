import axios from "axios";
import { useEffect,useState } from "react";
import {useParams, useSearchParams}  from "react-router-dom"
import Carousel from "./carousel/Carousel";
import "./com_css/reviewdetail.css"; // Position 전용 CSS 가져오기
function ReviewDetail(){

    const [name,setName]= useState('')
    const [img,setImg] = useState([])
    const [review,setReview] = useState('')
    const [comment,setComment] = useState('')
    const [stars,setStars] = useState('')
    const [subject,setSubject] = useState('')
    const [data,setData] = useState('')
    const { id } = useParams(); // 경로에서 id를 추출

    useEffect(()=>{
        axios.get(`/review/detail/${id}`).then((response)=>{
            console.log(response.data.user_name)
            console.log(response.data)
            setName(response.data.user_name)
            const imglist = []
            if (response.data.images && response.data.images.length > 0) {
                for (let i = 0 ; i < response.data.images.length ; i ++) {
                    imglist.push(response.data.images[i])
                }
                // setImg(response.data.images[0].image);
            } else {
                setImg(null); // 이미지가 없을 경우 null로 설정
            }
            setImg(imglist)
            setComment(response.data.comment)
            setReview(response.data.review)
            setStars(response.data.stars)
            setSubject(response.data.subject)
            setData(response.data)
        })
    },[]) 

    console.log("안녕",data)

    return(
    <div className="container0">
      <div className="carousel-box">
        {img.length > 0 ?(
          <div className="carousel-main" ><Carousel id = {id}/></div>
        )
        :
        (
          null
        )
      }
      <p style={{margin:"10px",padding:"5px",borderBottom:"1px solid #eee", width:"100%" ,textAlign:"left"}}>
      {Array.from({ length: stars }).map((_, index) => (
                            <i
                                key={index}
                                style={{color:"rgb(167, 122, 122)",cursor:"pointer",float:"left"}}
                                className= "star fas fa-star"
                            ></i>
                            ))}
                        {5 - stars ? Array.from({length:5-stars}).map((_,index)=>(
                            <i
                            key={index}
                            style={{color:"rgb(167, 122, 122)",cursor:"pointer",float:"left"}}
                            className= "star far fa-star"
                        ></i>    
                        )) : null}
      </p>
      <h style={{borderBottom:"1px solid #eee", width:"100%" ,textAlign:"left"}} >{subject}</h>
      <p style={{width:"100%" ,textAlign:"left"}}>{review}</p>
      </div>
    </div>
    )
}

export default ReviewDetail;