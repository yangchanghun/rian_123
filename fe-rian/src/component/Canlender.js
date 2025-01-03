import { useState,useEffect } from "react";
import "./com_css/calender.css"
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Calender(){
    const phone_number = localStorage.getItem('phone_number')
    const navigator = useNavigate();
    const token = localStorage.getItem('token');
    const [reservationDate,setReservationDate] = useState([])
    // 날짜를 클릭하면 시간이 나오는데 만약 예약이 차있으면 그 시간대는 붉은색의 div를 띄우게
    useEffect(()=>{
        // 서버측에서 전체 예약날짜를 가지옴
        //  클라이언트측에서 해당 날짜 클릭시 24/11/7 14:00 24/11/7 16:00 24/11/7 17:00 24/11/7 16:00 이런식으로 배열을 담고 가지고온 시간대에서 일치하는 것이 있다면
        // 배열에 담아서 그 배열을 돌리고 1이 있다면 div를 바꿔서 보여주도록


        if (!token){
            alert("로그인 해주세요")
            navigator("/login")
            return
        }

        axios
        .get("http://127.0.0.1:8000/reservation/check_date", {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 인증 토큰 포함
          },
        }).then((response)=>{
            setReservationDate(response.data)
            // console.log(response.data)
            // console.log(reservationDate)
        })
    },[])
    console.log(reservationDate)
    // 여기는 년도 달력을 넘겨서 보는 경우우
    const [viewRe,setViewRe] = useState(false)
    const [currentDate,setCurrentDate] = useState(new Date());
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const viewYear = currentDate.getFullYear();
    const viewMonth = currentDate.getMonth();

    const hourminute = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00']
    const [re_true,setRe_True] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0])

    // 오늘날짜짜
    const TodayYear =(new Date()).getFullYear();
    const TodayMonth = (new Date()).getMonth();
    const TodayDate = (new Date()).getDate()

    console.log("오늘은",TodayYear,TodayMonth+1,TodayDate)

    // 클릭했을때 색깔 유지되게
    const click_true = false

    //  re_True 인덱싱 작업?
    const updateIndex = (index) => {
        setRe_True((prev) => {
          const updatedArray = [...prev]; // 기존 배열을 복사
          updatedArray[index] = 1; // 원하는 인덱스의 값을 변경
          return updatedArray; // 새로운 배열 반환
        });
      };
    const NoupdateIndex = (index) => {
        setRe_True((prev) => {
          const updatedArray = [...prev]; // 기존 배열을 복사
          updatedArray[index] = 0; // 원하는 인덱스의 값을 변경
          return updatedArray; // 새로운 배열 반환
        });
      };

    const [reYear,setReYear] = useState('')
    const [reMonth,setReMonth] = useState('')
    const [reDate,setReDate] = useState(currentDate.getDate())
    const [reHour,setReHour] = useState('')
    const [reMinute,setReMinute] = useState('')

    // 이전 오늘 이후 버튼튼
    const goPrevMonth = () => {
        if (viewMonth !== TodayMonth ){
            setCurrentDate(new Date(viewYear, viewMonth - 1, 1)); // 이전 달로 이동
            setViewRe(false)
            setReHour('')
            setReDate('')           
        }
        // setCurrentDate(new Date(viewYear, viewMonth - 1, 1)); // 이전 달로 이동
        // setViewRe(false)
        // setReHour('')
        // setReDate('')
    };

    const goNextMonth = () => {
        setCurrentDate(new Date(viewYear, viewMonth + 1, 1)); // 다음 달로 이동
        setViewRe(false)
        setReHour('')
        setReDate('')
    };

    const goToday = () => {
        setCurrentDate(new Date()); // 오늘 날짜로 설정
        setViewRe(false)
        setReHour('')
        setReDate('')
    };
    // 
    //  여기는 현재 날짜. 구현 날짜 클릭시 현재 날짜에 저장되게금.
    // console.log(viewYear)
    // console.log(viewMonth+1)
    // console.log(reDate)
    // console.log(reHour)


    // 달,년도가 바뀔때마다 달력에 표시되는 일 수 체크.
    // 배열로 표시하면 좋을듯?
    // 5 x 7 35개 
    const currentWeek = []

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const startDay = firstDayOfMonth.getDay(); // 0 = Sunday, 6 = Saturday 1 -> 2인 thuesday 라고 치고 31이 saturday 0 이라고 치면
    const totalDays = lastDayOfMonth.getDate(); // 
    let dayCount = 1
    for (let i=0; i<5;i++){
        const week = []
        for(let j=0;j<7;j++){

            if (i==0 && j < startDay){
                week.push('') //시작전에 빈칸 투입.
            }
            else if(dayCount > totalDays){
                week.push("")
            }
            else{
                week.push(dayCount); // 날짜 채우기
                dayCount++;
            }
        }
        currentWeek.push(week)
    }
    // console.log(currentDate)
    // console.log(currentWeek)
    // const firstdaydate = new Date(currentYear, currentMonth, 5);
    // console.log(5)

    const [reda,setReda] = useState([])

    const formatDate = (date) => {
        return `${date.getFullYear()}-${
          String(date.getMonth() + 1).padStart(2, '0')}-${
          String(date.getDate()).padStart(2, '0')} ${
          String(date.getHours()).padStart(2, '0')}:${
          String(date.getMinutes()).padStart(2, '0')}:00`;
      };

    useEffect(()=>{
        for (let i =0 ; i<13; i++){
            if (reservationDate.includes(reda[i])){
                updateIndex(i)
            }
            else{
                NoupdateIndex(i)
            }
        }
    },[reda,reservationDate])

    const currentOnlcik = (event) =>{

        let Date_day = (parseInt(event.target.innerText))
        setReDate(Date_day)
        setViewRe(true)
        setReHour('')
        const newDates = [];

        // 8시부터 20시까지 반복문을 사용해 날짜 생성 및 포맷
        for (let hour = 8; hour <= 20; hour++) {
          const selectedDate = new Date(viewYear, viewMonth, Date_day, hour, 0, 0);
          const formattedDate = formatDate(selectedDate);
          newDates.push(formattedDate);
        }
    
        setReda(newDates); // 상태를 업데이트
    }
    console.log(re_true)

    const hourminuteOnclick = (event) =>{
        let hour  = parseInt((event.target.innerText).substr(0,2))
        setReHour(hour)
    }
    // console.log(reHour)

    const reservationOnclick = () =>{
        if (reHour ==''){
            alert("시간을 선택해주세요")
        } 
        else{
            const selectedDate = new Date(viewYear, viewMonth , reDate, reHour, 0, 0);

            // console.log(selectedDate); // 결과 예: Sat Dec 07 2024 15:00:00 GMT+0900 (KST)
            const formattedDate = `${selectedDate.getFullYear()}-${
                String(selectedDate.getMonth() + 1).padStart(2, '0')}-${
                String(selectedDate.getDate()).padStart(2, '0')} ${
                String(selectedDate.getHours()).padStart(2, '0')}:${
                String(selectedDate.getMinutes()).padStart(2, '0')}:00`;
            const requestData = {
                'date': formattedDate,
            };
            

            axios.post("http://127.0.0.1:8000/reservation/send_aligo_sms",
                { 
                    phone_number: phone_number, 
                    date_time: selectedDate 
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // JWT 인증 토큰 추가

                    },
                  }
            ).then((response)=>{
                console.log(response.data)
            }).catch(()=>{
                alert("안됨")
                navigator('/reservation')
                return
            })

            axios.post("http://127.0.0.1:8000/reservation/create_reservation",requestData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, // JWT 인증 토큰 추가
                  }}
            ).then(()=>{
                alert("예약 되셨습니다");
                navigator('/')

            })
            .catch(()=>{
                alert("예약이 불가능합니다")
            })
            // .catch(console.log("안됨됨"))
        }


        // 콘솔로 확인

    }

    return (
        <div className="calender">
            <div className="header">
                <div className="year-month">
                {viewYear} 년 {viewMonth+1}월
                </div>
                <div className="nav">
                    <button className="nav-btn go-prev" onClick={goPrevMonth}>&lt</button>
                    <button className="nav-btn go-today" onClick={goToday}>Today</button>
                    <button className="nav-btn go-next" onClick={goNextMonth}>&gt</button>
                </div>
            </div>
            <div className="main">
                <table class="days">
                    <tr>
                        {/* <th>주</th> */}
                        <th>일</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th>토</th>
                    </tr>
                    <tr>
                        {/* <td>1주</td> */}
                        {currentWeek[0].map((a, b) => (
                            a // 숫자가 있는지 확인
                            ? (
                                TodayMonth === viewMonth // 이번 달인지 확인
                                    ? (
                                        TodayDate <= a // 현재 날짜 이후일 때
                                            ? (
                                                <td onClick={currentOnlcik} key={b}>
                                                    {a}
                                                </td>
                                            ) : (
                                                <td key={b} className="td-block">
                                                    {a}
                                                </td>
                                            )
                                    ) : (
                                        // 다음 달의 경우
                                        <td onClick={currentOnlcik} key={b}>
                                            {a}
                                        </td>
                                    )
                            ) : (
                                // 숫자가 없는 경우
                                <td key={b} className="td-block"></td>
                            )
                        ))}
                        {/* <td>{currentWeek[0][0]}</td>
                        <td>월</td>
                        <td>화</td>
                        <td>수</td>
                        <td>목</td>
                        <td>금</td>
                        <td>토</td> */}
                    </tr>
                    <tr>
                        {/* <td>2주</td> */}
                        {currentWeek[1].map((a, b) => (
                             a // 숫자가 있는지 확인
                             ? (
                                 TodayMonth === viewMonth // 이번 달인지 확인
                                     ? (
                                         TodayDate <= a // 현재 날짜 이후일 때
                                             ? (
                                                 <td onClick={currentOnlcik} key={b}>
                                                     {a}
                                                 </td>
                                             ) : (
                                                 <td key={b} className="td-block">
                                                     {a}
                                                 </td>
                                             )
                                     ) : (
                                         // 다음 달의 경우
                                         <td onClick={currentOnlcik} key={b}>
                                             {a}
                                         </td>
                                     )
                             ) : (
                                 // 숫자가 없는 경우
                                 <td key={b} className="td-block"></td>
                             )
                        ))}
                    </tr>
                    <tr>
                        {/* <td>3주</td> */}
                        {currentWeek[2].map((a,b)=>(
                            a // 숫자가 있는지 확인
                            ? (
                                TodayMonth === viewMonth // 이번 달인지 확인
                                    ? (
                                        TodayDate <= a // 현재 날짜 이후일 때
                                            ? (
                                                <td onClick={currentOnlcik} key={b}>
                                                    {a}
                                                </td>
                                            ) : (
                                                <td key={b} className="td-block">
                                                    {a}
                                                </td>
                                            )
                                    ) : (
                                        // 다음 달의 경우
                                        <td onClick={currentOnlcik} key={b}>
                                            {a}
                                        </td>
                                    )
                            ) : (
                                // 숫자가 없는 경우
                                <td key={b} className="td-block"></td>
                            )
                        ))}
                        {/* <td>일</td>
                        <td>월</td>
                        <td>화</td>
                        <td>수</td>
                        <td>목</td>
                        <td>금</td>
                        <td>토</td> */}
                    </tr>
                    <tr>
                    {currentWeek[3].map((a,b)=>(
                            a // 숫자가 있는지 확인
                            ? (
                                TodayMonth === viewMonth // 이번 달인지 확인
                                    ? (
                                        TodayDate <= a // 현재 날짜 이후일 때
                                            ? (
                                                <td onClick={currentOnlcik} key={b}>
                                                    {a}
                                                </td>
                                            ) : (
                                                <td key={b} className="td-block">
                                                    {a}
                                                </td>
                                            )
                                    ) : (
                                        // 다음 달의 경우
                                        <td onClick={currentOnlcik} key={b}>
                                            {a}
                                        </td>
                                    )
                            ) : (
                                // 숫자가 없는 경우
                                <td key={b} className="td-block"></td>
                            )
                        ))}
                        {/* <td>4주</td>
                        <td>일</td>
                        <td>월</td>
                        <td>화</td>
                        <td>수</td>
                        <td>목</td>
                        <td>금</td>
                        <td>토</td> */}
                    </tr>
                    <tr>
                    {currentWeek[4].map((a,b)=>(
                            a // 숫자가 있는지 확인
                            ? (
                                TodayMonth === viewMonth // 이번 달인지 확인
                                    ? (
                                        TodayDate <= a // 현재 날짜 이후일 때
                                            ? (
                                                <td onClick={currentOnlcik} key={b}>
                                                    {a}
                                                </td>
                                            ) : (
                                                <td key={b} className="td-block">
                                                    {a}
                                                </td>
                                            )
                                    ) : (
                                        // 다음 달의 경우
                                        <td onClick={currentOnlcik} key={b}>
                                            {a}
                                        </td>
                                    )
                            ) : (
                                // 숫자가 없는 경우
                                <td key={b} className="td-block"></td>
                            )
                        ))}
                        {/* <td>5주</td> */}
                        {/* <td>일</td>
                        <td>월</td>
                        <td>화</td>
                        <td>수</td>
                        <td>목</td>
                        <td>금</td> */}
                    </tr>
                </table>
                <div className="dates" ></div>
            </div>
            <div className="reservation" >
            {viewRe === true ? (
                <div>
                    예약가능 <span className="pill">00:00</span> 예약불가 <span className="pill reservation-0">00:00</span>
                    <div> </div>
                    {hourminute.map((a, b) => (
                        re_true[b] === 0 ? (
                            <span key={b} onClick={hourminuteOnclick} className="pill">
                            {a}
                        </span>
                    ):(
                        <span key={b} onClick={hourminuteOnclick} className="pill reservation-0">
                        {a}
                    </span>
                    )

                    ))}
                    <div></div>
                    <button onClick={reservationOnclick}>예약하기</button>
                </div>
            ) : null}
            {reHour ?(
                <div>{(viewYear.toString()).slice(2,4)}/{viewMonth+1}/{reDate} {reHour}:00 </div>
            ):(
                null
            )}
            </div>
        </div>
    )
}
export default Calender