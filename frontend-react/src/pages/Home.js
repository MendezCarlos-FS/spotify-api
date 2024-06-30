import { useState } from "react";
import authService from "../services/auth.service";

export default function Home() {
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState(null);
    function search() {
        authService.search(searchValue, setResults);
    }

    console.log(results);

    return (
        <section>
            <h1>Spotify Search</h1>
            <div>
                <input type="text" placeholder="Search for artist, track or album."
                    onChange={$event => {setSearchValue($event.target.value)}}/>
                <button type="button" onClick={search}>Search</button>
                {searchValue}
            </div>
            {
                results
                ? <h3>No results to display.</h3>
                : <></>
            }
        </section>
    );
}