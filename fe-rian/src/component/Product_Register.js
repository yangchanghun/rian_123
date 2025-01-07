import { useState } from "react"
import "./com_css/product_registercss.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function Product_Register(){

    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [newfile,setNewFile] = useState([])
    const [previewImg,setPreviewImg] = useState([])
    const token = localStorage.getItem('token');
    console.log(token)
    const navigator = useNavigate()
    const handleSubmitButton = (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
    
        // 파일 여러 개 추가
        for (let i = 0; i < newfile.length; i++) {
          formData.append("images", newfile[i]); // 서버에서 "images" 필드로 처리해야 함
        }
    
        axios
          .post("/product/create_product", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // JWT 인증 토큰 추가
            },
          })
          .then((response) => {
            console.log("서버 응답:", response.data);
            navigator("/product")
          })
          .catch((error) => {
            console.error("상품 등록 실패:", error);
            alert("상품 등록 실패!");
          });
      };

    console.log(previewImg)
    return(
        <div className="form-background">
            <div className="form-white">
                <form>
                    <h3> 상품 등록 </h3>
                    <div className="w-100">
                    <p>상품명</p>
                    <input type = "text" className="form-input" onChange={(event)=>{
                        setName(event.target.value)
                    }}></input>
                    </div>
                    <div className="w-100">
                        <p>가격</p>
                    <input type = "text" className="form-input" onChange={(event)=>{
                        setPrice(event.target.value)
                    }}></input>
                    </div>
                    <div className="w-100"> 
                        <p>설명</p>
                    <textarea className="form-input message-box" onChange={(event)=>{
                        setDescription(event.target.value)
                    }}></textarea>
                    </div>
                    <div>
                        <input type = "file" multiple="multiple" onChange={(event)=>{
                            const imglist = event.target.files
                            let urlimglist = [...previewImg]
                            let filelist = [...newfile]
                            for (let i = 0; i < imglist.length ; i += 1){
                                urlimglist.push(URL.createObjectURL(imglist[i]))
                                filelist.push(imglist[i])
                            }
                            setPreviewImg(urlimglist)
                            setNewFile(filelist)
                        }}></input>
                    </div>
                </form>
              
                <button onClick={handleSubmitButton}>Send</button>
            </div>
            <div>
                {previewImg.map((imgSrc, index) => (
                    <img key={index} src={imgSrc} alt={`Preview ${index}`} style={{ width: "100px", height: "100px", margin: "5px" }} />
                ))}
            </div>
        </div>
        // <div className="register-box">
        //     <div className="name">
        //         <input name = "name" type="text" onChange={(e)=>{
        //             setName(e.target.value)
        //         }}/>
        //     </div>
        //     <div className = "price">
        //         <input  name = "price" type="text" onChange={(e)=>{
        //             setPrice(e.target.value)
        //         }}/>
        //     </div>

        //     <div className = "description">
        //         <input  name = "description" type="text" onChange={(e)=>{
        //             setDescription(e.target.value)
        //         }}/>
        //     </div>

        //     <div className="preview-container">
        //         {previewImg.map((url, index) => (
        //             <img key={index} src={url} alt={`preview-${index}`} style={{ width: 100, height: 100, margin: 10 }} />
        //         ))}
        //     </div>
        //     <div>
        //         <input 
        //         type="file"
        //         multiple
        //         onChange = {handleCreatePrviewImg}
        //         />  
        //     </div>

        // </div>
    )
}
export default Product_Register