import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios"
import './com_css/login.css'
import { Link } from "react-router-dom";
function Login({set로그인}) {
    const [id,setId] = useState('')
    const [password,setPassword]= useState('')
    const navigate = useNavigate()
    // 로컬스토리지에 저장해야함
    const [token,setToken] = useState('')
    const [refreshtoken,setRefreshtoken] = useState('')
    console.log(id)
    console.log(password)

    const idChange =(e)=>{
      setId(e.target.value)
    }
    const pwChange = (e) =>{
      setPassword(e.target.value)
    }

    const sendClick = () =>{
      axios
      .post(
        "http://127.0.0.1:8000/api/login/", // 요청 URL
        { 
          email: id, 
          password: password 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("로그인 성공:", response.data);
        setToken(response.data.access)
        setRefreshtoken(response.data.refresh)
        localStorage.setItem('token',response.data.access)
        console.log(localStorage.getItem('token'))
        // 사용자 정보 가져오기
        axios.get("http://127.0.0.1:8000/api/me/",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Postman의 Bearer Token과 동일한 형식
              },
        }
        ).then((response)=>{
            console.log(response.data)
            localStorage.setItem('name',response.data.name)
            localStorage.setItem('phone_number',response.data.phone_number)
            set로그인('로그아웃')
            navigate('/')
        })
        .catch((error)=>{
            console.error("실패",error.response ? error.response.data : error.message)
            navigate("/login")
        })

      })
      .catch((error) => {
        console.error("로그인 실패:", error.response ? error.response.data : error.message);
      });
    }
    const kakaologin = () => {
      const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=f14449a29b743d98c7bf6e7a9b39479c&redirect_uri=http://localhost:3000/kakao/callback&prompt=login`;
      window.location.href = url;
  }
    return (

      <div className="login-container">
        <div className="login-box">
          <div className="text-box">
            <p>이메일과 비밀번호를</p>
            <p>입력해주세요</p>
          </div>
          <div className="login-form">
            <div className="email-form" style={{textAlign:"left"}}>
              <p style={{textAlign:'left',marginLeft:"50px",fontWeight:"900",marginBottom:"3px"}}>이메일 주소</p>
              <input onChange={(e)=>(idChange(e))} type="email" className="form-input" style={{marginLeft:"50px",marginTop:"1px",width:"500px",height:"50px"}}></input>
            </div>
            <div className="pw-form" style={{textAlign:"left"}}>
            <p style={{textAlign:'left',marginLeft:"50px",fontWeight:"900",marginBottom:"3px"}}>비밀번호</p>
            <input onChange={(e)=>(pwChange(e))} type="password" className="form-input" style={{marginLeft:"50px",marginTop:"1px",width:"500px",height:"50px"}}></input>
            </div>
            <div className="btn-box" style={{textAlign:"left"}}>
              <button onClick={sendClick} className="login-btn" style={{textAlign:"center"}}><span >로그인</span></button>
            </div>
            <div>
              <p style={{textAlign:"right",marginRight:"50px"}}>계정이 없으신가요? <Link to='/signup' style={{textDecoration: 'none'}}>회원가입하기</Link></p>
            </div>
            <div>
              <p style={{textAlign:"left", marginLeft:"50px"}}>쉽고 간편하게 로그인하고 싶다면?</p>
            </div>
            <div className="btn-box" style={{textAlign:"left"}}>
              <button onClick={kakaologin} className="kakao-login-btn" style={{textAlign:"center",}}><i _ngcontent-iwt-c83="" class="kakao" style={{textIndent:' -9999px'}}>kakao</i>로그인</button>
            </div>


          </div>
        </div>
      </div>
    )
}

export default Login