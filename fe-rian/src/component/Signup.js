import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./com_css/signup.css"
import axios from "axios";

function Signup() {
    const navigate = useNavigate();

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phonenumber,setPhoneNumber] = useState('')
    const [pw,setPw] = useState('')
    const [pw2,setPw2] = useState('')
    const [code,setCode] = useState('')
    const [good,setgood] = useState(false)
    const [sendok,setSendOk] = useState(false)
    console.log(sendok)
    const permissionClick = (e) =>{
        e.preventDefault();
        setSendOk(true)
        axios.post("/permissions/mailpermission/",
            { 
                to_email: email, 
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
        ).then((response)=>{
            console.log("성공",response.data)
        }).catch((error)=>{
            console.log("실패",error.response)
        })
    }
    const checkClick= (e) =>{
        e.preventDefault();
        axios.post("/permissions/mailcheck/",
            {
                email : email,
                code : code
            },              {
                headers: {
                  "Content-Type": "application/json",
                },
            }
        ).then((response)=>{
            console.log("성공",response.data.permisson)
            setgood(response.data.permisson)
        }).catch((error)=>{
            console.log("실패",error.response)
            alert("인증번호가 다릅니다")
        })
    }
    
    console.log(good)
    const nameChange = (e) =>{
        setName(e.target.value)
    }
    const emailChange = (e) =>{
        setEmail(e.target.value)
    }
    const phonenumberChange = (e) =>{
        setPhoneNumber(e.target.value)
    }
    const pwChange = (e) =>{
        setPw(e.target.value)
    }
    const pw2Change = (e) =>{
        setPw2(e.target.value)
    }  
    const codeChange = (e) =>{
        setCode(e.target.value)
    }   
    console.log(email)
    console.log(name)
    console.log(phonenumber)
    

    const okClick = (e) =>{
        e.preventDefault();
        if (good === true){
            axios.post(
                "/api/signup/", // 요청 URL
                { 
                  email: email, 
                  password: pw ,
                  password2: pw2,
                  phone_number:phonenumber,
                  real_name : name
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              ).then((response)=>{
                console.log(response.data)
                navigate('/')
              }).catch((error)=>{
                if(error.response.data.email){
                    alert("이미 가입된 게정입니다")
                }
              })
        }
        else if (good === false){
            console.log("이메일 인증을 완료해주세요")
        }
    }

    return (
        <div className="all-box">

            <form className="form-box"> 
                <div className="box">
                <div>
                    <h1>회원가입</h1>
                    <p1>회원이 되어 다양한 혜택을 경험해 보세요!</p1>
                </div>
                <div className="name-box">
                    <div>이름</div>
                     <input onChange={nameChange}></input>
                </div>
                <div className="name-box" >
                    <div className="display-box">
                    <div>이메일</div> <div>인증번호 받기</div>
                    {sendok ?(
                        <button className="per-btn stop" onClick={(e)=>{
                            e.preventDefault();
                        }}></button>
                    )
                    :
                    (
                        <button className="per-btn" onClick={permissionClick}></button>
                    )
                }
                    </div>
                    <div className="display-box">
                     <input type = "email" onChange={emailChange}></input>
                     <div className="active"><input onChange={codeChange} ></input></div>
                    {good?(
                     <button className="active-button stop" onClick={checkClick}>인증완료</button>
                    )
                    :
                    (
                        <button className="active-button" onClick={checkClick}>인증</button>
                    )
                    }


                     </div>
                </div>
                <div className="name-box ">
                    <div>비밀번호</div>
                     <input type="password"  onChange={pwChange}></input>
                </div>
                <div className="name-box ">
                    <div>비밀번호 확인</div>
                     <input type="password" onChange={pw2Change}></input>
                </div>
                <div className="name-box">
                    <div>전화번호</div>
                     <input  onChange={phonenumberChange}></input>
                </div>                
                <button onClick={okClick} className="ga-btn">가입완료</button> 
                <button className="ga-btn">가입취소</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;