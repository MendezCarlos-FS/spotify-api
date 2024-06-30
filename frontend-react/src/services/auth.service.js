const API_BASE = process.env.REACT_APP_BASE_URL
? process.env.REACT_APP_BASE_URL
: "http://localhost:8000/api/v1";

const jwtUrl = `${API_BASE}/spotify/checkJWT`;
const logoutUrl = `${API_BASE}/spotify/logout`;
const searchUrl = `${API_BASE}/spotify/search`;

const checkJwt = () => {
    fetch(jwtUrl)
    .then(res => res.json())
    .then(json => {
        if (json.url) {
            window.location.href = json.url;
        }
    })
    .catch(err => {
        console.log(err);
    });
}

const logout = async () => {
    await fetch(logoutUrl)
    .then(res => res.json())
    .then(json => {
        if (json.url) {
            window.location.href = json.url;
        }
    });
}

const search = async (value, setResultsFunc) => {
    fetch(`${searchUrl}?q=${value}`)
    .then(res => res.json())
    .then(json => {
        setResultsFunc(json);
    });
}

export default {
    checkJwt,
    logout,
    search
}