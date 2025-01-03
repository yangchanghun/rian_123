function Kakaologin() {
    const kakaologin = () => {
        const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=f14449a29b743d98c7bf6e7a9b39479c&redirect_uri=http://localhost:3000/kakao/callback&prompt=login`;
        window.location.href = url;
    }

    return (
        <div>
            <button onClick={kakaologin}>Kakaologin</button>
        </div>
    )
}

export default Kakaologin;