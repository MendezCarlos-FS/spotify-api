import { useState } from "react";
import authService from "../services/auth.service";
import { FaSearch } from "react-icons/fa";

export default function Header() {
    const [searchValue, setSearchValue] = useState("");

    function logout() {
        authService.logout();
    }

    function search() {
        authService.search(searchValue);
    }

    return (
        <header style={styles.container}>
            <img src="./Spotify_Logo.png"
                width={50}
                height={50}/>
            <div style={styles.label}>
                <label for="search">Search for...</label>
                <br/>
                <div style={styles.searchContainer}>
                    <FaSearch style={styles.search} size={20} onClick={search}/>
                    <input id="search" style={styles.input} type="text"
                        onChange={$event => {setSearchValue($event.target.value)}}/>
                </div>
            </div>
            <nav>
                <a onClick={logout}>
                    <button style={styles.logout} type="button">Logout</button>
                </a>
            </nav>
        </header>
    );
}

const styles = {
    container: {
        backgroundColor: "#1AB14C",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    },
    input: {
        backgroundColor: "#00000000",
        color: "white",
        border: "none",
        borderBottom: "1px solid white",
        width: "300px",
    },
    label: {
        color: "white"
    },
    searchContainer: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
    },
    search: {
        cursor: "pointer",
    },
    logout: {
        color: "white",
        backgroundColor: "#00000000",
        border: "none",
        cursor: "pointer"
    },
}