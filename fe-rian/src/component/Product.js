import { useState, useEffect } from "react";
import axios from "axios";

function Product() {
    const [product, setProduct] = useState([]); // 초기 상태 빈 배열

    useEffect(() => {
        axios
            .get("/product/list")
            .then((response) => {
                // console.log(response.data); // 데이터 로깅
                // const names = response.data.map((item) => item.name); // 이름만 추출
                // setProduct(names); // 한 번에 상태 업데이트
                response.data.map((a,b)=>{
                    console.log(response.data); // 데이터 로깅
                    const item = response.data.map((item) => item); // 이름만 추출
                    setProduct(item); // 한 번에 상태 업데이트
                })
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
    }, []); // 빈 배열로 두어 마운트 시 한 번만 실행
    console.log(product)

    return (
        <div>
            <h1>상품 목록</h1>
            <ul>
                {product.map((item) => (
                    <div key={item.id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Price: {item.price}원</p>
                        <p>Stars: {item.stars_average}</p>
                        <div>
                            {item.images.map((image) => (
                                <img
                                    key={image.id}
                                    src={image.image}
                                    alt={`${item.name} image`}
                                    style={{ width: "200px", height: "auto", marginRight: "10px" }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Product;