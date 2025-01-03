import { useNavigate } from "react-router-dom"

function Logout({set로그인}){
    const navigate = useNavigate()
    return(
        <div>진짜 로그아웃?
        <button onClick={()=>{
            localStorage.setItem('token','')
            localStorage.setItem('name','') 
            set로그인("로그인")
            navigate('/')
        }}>ㅇㅇ
        </button>
        </div>
    )
}

export default Logout