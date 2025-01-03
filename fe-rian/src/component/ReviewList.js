import { useEffect,useState } from "react";
import axios from "axios";
import "./com_css/reviewlist.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function ReviewList(){
    const navigate = useNavigate();
    const[results,setResults] = useState([]);
    const [resultlength,setResultLength]= useState();
    const [url,setUrl] = useState('http://127.0.0.1:8000/review/review_list');
    const pagination = 8;
    const [currentPage, setCurrentPage] = useState(1); // 현재 활성화된 페이지 
    const [prev,setPrev] = useState('');
    const [next,setNext] = useState('');
    const [subject,setSubject] = useState('');
    console.log(Math.floor(resultlength/pagination))
    useEffect(()=>{
        axios.get(`${url}`).then((response)=>{
            // console.log(response.data.results)
            setResults(response.data.results)
            console.log(response.data)
            setResultLength(response.data.count)

        })
    },[url])

    return(
        <div>
            
            {/* {results.map((a,b)=>{
                return<div>{a.stars}</div>
})} */}
<div>
<div className="title-wrap">
    <p className="title">시술 후기</p>
</div>
<div className="container">
<div class = " row">
    <div style={{borderTop:"1px solid black"}}></div>
{results.length > 0 ? (
    results.map((a, b) => (
        <div class="col-xxl-3 col-lg-4  col-sm-6" key={b}>
            {a.images && a.images.length > 0 ? (
                <div class="card img-box" style={{width:"18rem",height:"25rem",border:"1px solid #ddd",overflow:"hidden"}}>
                    <div className="img-container" style={{
                        width: "90%",
                        height: "300px", // 고정된 높이
                        borderRadius: "10px",
                        overflow: "hidden", // 이미지 크기를 넘어가는 부분 숨김
                        }}>
                    <img 
                    style={{
                        width: "100%", // 부모 너비에 맞춤
                        height: "100%", // 부모 높이에 맞춤
                        objectFit: "cover", // 비율 유지하며 영역 채움
                        display: "block", // inline-block 문제 방지
                        cursor:"pointer",
                    }}
                    src={`${a.images[0].image}`} alt={`Image for Review ${b}` } className="card-img-top" 
                    onClick={()=>{navigate(`/reviewdetail/${a.id}`)}}
                    />
                    </div>
                    <div class="card-body" style={{width:"90%", height:"30px"}} >
                        <p class="card-text" style={{width:"90%", textAlign:"left", marginLeft:"none",marginBottom:"2px"}}>
                            {a.subject.length >14 ? (
                            a.subject.slice(0,14)+"..."
                            ):
                            (
                                a.subject
                            )
                            }

                            
                            </p>
                        <p className="star-box">
                        {Array.from({ length: a.stars }).map((_, index) => (
                            <i
                                key={index}
                                style={{color:"rgb(167, 122, 122)",cursor:"pointer",float:"left"}}
                                className= "star fas fa-star"
                            ></i>
                            ))}
                        {5 - a.stars ? Array.from({length:5-a.stars}).map((_,index)=>(
                            <i
                            key={index}
                            style={{color:"rgb(167, 122, 122)",cursor:"pointer",float:"left"}}
                            className= "star far fa-star"
                        ></i>    
                        )) : null}
                        </p>
                    </div>
                </div>
            ) : (
                <img src = {"http://127.0.0.1:8000/media/review_images/텅 빈.jpg"} onClick={()=>{navigate(`/reviewdetail/${a.id}`)}}></img>
            )}
        </div>
    ))
) : null}




</div>

            <nav aria-label="Page navigation example" style={{marginTop:"20px"}}>
            <ul class="pagination" style={{float:"left"}}>
                <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                {Array.from({ length: Math.ceil(resultlength / pagination) }, (_, i) => (
                    <li
                        class={`page-item ${currentPage === i + 1 ? "active" : ""}`} // 현재 페이지면 active 클래스 추가
                        key={i}
                    >
                        <a
                            class="page-link"
                            onClick={() => {
                                setCurrentPage(i + 1); // 상태 먼저 업데이트
                                setUrl(`http://127.0.0.1:8000/review/review_list?page=${i + 1}`);
                            }}
                        >
                            {i + 1}
                        </a>
                    </li>
                ))}
                {/* `${url}`+"?page="+`${i}` */}
                {/* <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li> */}

                <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
            <div style={{float:"right" ,marginRight:"30px"}}>
                    <Link to="/reviewcreate" style={{textDecoration:"none"}}>글쓰기</Link>
            </div>
            </nav>
</div>
            {/* <div class="row">
                <div class="col-lg-3 col-md-6"> 안녕 </div>
                <div class="col-lg-3 col-md-6"> 안녕 </div>
                <div class="col-lg-3 col-md-6"> 안녕 </div>
                <div class="col-lg-3 col-md-6"> 안녕 </div>
            </div>
            <div class="row">
                <div class="col-lg-3 col-md-6"> 안녕 </div>
                <div class="col-lg-3 col-md-6"> 안녕 </div>
                <div class="col-lg-3 col-md-6"> 안녕 </div>
                <div class="col-lg-3 col-md-6"> 안녕 </div>
            </div> */}

        </div>
        </div>
    )
}

export default ReviewList;