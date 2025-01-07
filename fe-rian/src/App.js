import logo from './logo.svg';
import './App.css';
import {Navbar,Container,Nav} from 'react-bootstrap';
import { Route,Routes,Link } from 'react-router-dom';
import Position from './component/Position';
import MainPage from './MainPage';
import ReviewList from './component/ReviewList';
import Login from './component/Login';
import Logout from './component/logout';
import Product from './component/Product';
import Product_Register from './component/Product_Register';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Calender from './component/Canlender';
import ReviewDetail from './component/ReviewDetail';
import Kakaologin from './component/Kakaologin';
import KakaoCallback from './component/KakaoCallback';
import KakaoSignup from './component/KakaoSignup';
import Signup from './component/Signup';
import ReviewCreate from './component/ReviewCreate';

function App() {

  useEffect(() => {
    // 토큰이 존재하는 경우 API 요청
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get("/api/me/", {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 인증 토큰 포함
          },
        })
        .then((response) => {
          console.log(response.data); // API 응답 출력
        })
        .catch((error) => {
          console.error("API 호출 중 오류 발생:", error); // 오류 처리
          localStorage.setItem('token','')
          localStorage.setItem('name','')       
          localStorage.setItem('refresh','')          
        });
    }
  }, []); // 빈 의존성 배열로 컴포넌트 최초 렌더링 시 한 번 실행


  if (!localStorage.getItem('token')){
    localStorage.setItem('token','')
  }
  if (!localStorage.getItem('refresh')){
    localStorage.setItem('refresh','')
  }
  if (!localStorage.getItem('name')){
    localStorage.setItem('token','')
  }
  if (!localStorage.getItem('name')){
    localStorage.setItem('phone_number','')
  }

  useEffect(()=>{
    const 상태 = localStorage.getItem('token')
    if (상태) {
      set로그인("로그아웃")
    }
    else{
      set로그인("로그인")
    }
  },[])
  const [로그인,set로그인] = useState('')

  return (
    <div className="App">

<nav className="nav-container">
      {/* 이름 */}
      <Link to ="/"style={{ textDecoration: 'none', fontWeight:'700',fontSize:'20px' }}  className="nav-item name">Rian</Link>
      <div></div>
      
      {/* 중앙 아이템 */}
      <div className="res-pos-rev">
        <Link to="/reservation" className="nav-item" style={{ float: 'left', textDecoration: 'none', }}>
          <i className="fas fa-street-view"></i><span>상담예약</span>
        </Link>
        <Link to="/position" className="nav-item" style={{ float: 'left', textDecoration: 'none',  }}>
          <i className="fas fa-street-view"></i><span>위치</span>
        </Link>
        <Link to="/review" className="nav-item" style={{ float: 'left', textDecoration: 'none', }}>
          <i className="fas fa-pen-alt"></i><span>리뷰</span>
        </Link>
      </div>
      
      <div className="flex-grow-box"></div>
      
      {/* 로그인 */}
      {로그인 =="로그인"?(
      <Link to="/login" className="nav-item login" style={{ float: 'left', textDecoration: 'none' }}>
      <i className="fas fa-sign-in-alt"></i>{로그인}
    </Link>
      ):
      (
        <Link to="/logout" className="nav-item login" style={{ float: 'left', textDecoration: 'none' }}>
        <i className="fas fa-sign-in-alt"></i>{로그인}
      </Link>
      )
      }

    </nav>


      <Routes>
        <Route path="" element={<MainPage/>}/>
        <Route path="/position" element={<Position/>}/>
        <Route path="/review" element={<ReviewList/>} />
        <Route path="/login" element={<Login set로그인 = {set로그인}/>} />
        <Route path="/logout" element={<Logout set로그인 = {set로그인}/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/product_register" element={<Product_Register/>} />
        <Route path="/reservation" element={<Calender/>} />
        <Route path="/kakaologin" element={<Kakaologin/>} />
        <Route path="/kakao/callback" element={<KakaoCallback set로그인 ={set로그인}/>} />
        <Route path="/kakao/signup" element={<KakaoSignup/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/reviewcreate" element={<ReviewCreate/>} />
        <Route path="/reviewdetail/:id" element={<ReviewDetail/>} />

      </Routes>
    </div>

    
  );
}

export default App;
