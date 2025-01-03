import './MainPagecss.css'
import ReviewCarousel from './component/carousel/ReviewCarousel';
function MainPage(){



    return(
        <div>
            <div className='up'></div>
            <p style={{fontFamily:"Noto Sans KR",fontWeight:"800",fontSize:"50px",borderBottom:"5px solid #eee"}}>Rian</p>
            <p style={{fontFamily:"Noto Sans KR",fontWeight:"500",fontSize:"25px",borderBottom:"2px solid #eee"
                ,width:"200px",textAlign:"left",marginLeft:"360px"
            }}>리뷰</p>
            <ReviewCarousel/>
        </div>
    )
}
export default MainPage