function Kakaologin() {
    const kakaologin = () => {
        const clientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
        const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

        const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&prompt=login`;
        window.location.href = url;
    }

    return (
        <div>
            <button onClick={kakaologin}>Kakaologin</button>
        </div>
    )
}

export default Kakaologin;