import { useState } from "react";
import authService from "../services/auth.service";

export default function Home() {
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState(null);
    const [tracksCollapsed, setTracksCollapsed] = useState(false);
    const [albumsCollapsed, setAlbumsCollapsed] = useState(false);
    const [artistsCollapsed, setArtistsCollapsed] = useState(false);

    function search() {
        authService.search(searchValue, setResults);
    }

    function displayTracks() {
        if (!results?.tracks) return <></>;

        return (
            <>
                <h2 style={styles.categoryName}
                    onClick={() => setTracksCollapsed(!tracksCollapsed)}>
                    {tracksCollapsed ? "►" : "▼"} Tracks
                </h2>
                {
                    tracksCollapsed
                    ? <></>
                    :
                    <div style={styles.cardList}>
                    {
                        results.tracks.items.map(track => {
                            const { id, name, album, artists, preview_url } = track;
                            const { spotify } = track.external_urls;
                            const albumImage = album.images[album.images.length - 2];

                            return (
                                <div style={styles.card} key={id}>
                                    <h3 style={styles.textCenter}>{name}</h3>
                                    <div style={styles.details}>
                                        <div>
                                            <p>Artist: {artists[0].name}</p>
                                            <p>Album: {album.name}</p>
                                        </div>
                                        <img src={albumImage.url}
                                            width={150}
                                            height={150}/>
                                    </div>
                                    {
                                        preview_url
                                        ?
                                        <audio controls>
                                            <source src={track.preview_url} type="audio/mpeg"/>
                                            Your browser can't display the audio preview.
                                        </audio>
                                        :
                                        <h4 style={styles.textCenter}>There is no preview for this track.</h4>
                                    }
                                    <a style={styles.button} href={spotify} target="_blank">
                                        <button type="button">View on Spotify</button>
                                    </a>
                                </div>
                            )
                        })
                    }
                    </div>
                }
            </>
        );
    }

    function displayArtists() {
        if (!results?.artists) return <></>;

        return (
            <>
                <h2 style={styles.categoryName}
                onClick={() => setArtistsCollapsed(!artistsCollapsed)}>
                    { artistsCollapsed ? "►" : "▼" } Artists
                </h2>
                {
                    artistsCollapsed
                    ? <></>
                    :
                    <div style={styles.cardList}>
                        {
                            results.artists.items.map(artist => {
                                const { id, name } = artist;
                                const artistImage = artist.images[artist.images.length - 2];
                                const { spotify } = artist.external_urls;

                                return (
                                    <div style={styles.card} key={id}>
                                        <h3 style={styles.textCenter}>Name: {name}</h3>
                                        <img style={styles.image}
                                            src={artistImage.url}
                                            width={200}
                                            height={200}/>
                                            <a style={styles.button} href={spotify} target="_blank">
                                                <button type="button">View on Spotify</button>
                                            </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </>
        );
    }

    function displayAlbums() {
        if (!results?.albums) return <></>;

        return (
            <>
                <h2 style={styles.categoryName}
                onClick={() => setAlbumsCollapsed(!albumsCollapsed)}>
                    { albumsCollapsed ? "►" : "▼" } Albums
                </h2>
                {
                    albumsCollapsed
                    ? <></>
                    :
                    <div style={styles.cardList}>
                        {
                            results.albums.items.map(album => {
                                const { id, name, artists, total_tracks } = album;
                                const albumImage = album.images[album.images.length - 2];
                                const { spotify } = album.external_urls;

                                return (
                                    <div style={styles.card} key={id}>
                                        <h3 style={styles.textCenter}>Name: {name}</h3>
                                        <div style={styles.details}>
                                            <div>
                                                <p>Artist: {artists[0].name}</p>
                                                <p>Number of Tracks: {total_tracks}</p>
                                            </div>
                                            <img style={styles.image}
                                                src={albumImage.url}
                                                width={100}
                                                height={100}/>
                                        </div>
                                        <a style={styles.button} href={spotify} target="_blank">
                                            <button type="button">View on Spotify</button>
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </>
        )
    }

    console.log(results);

    return (
        <section style={styles.container}>
            <h1>Spotify Search</h1>
            <div>
                <input type="text" placeholder="Search for artist, track or album."
                    onChange={$event => {setSearchValue($event.target.value)}}/>
                <button type="button" onClick={search}>Search</button>
            </div>
            {
                results ?
                <>
                    {displayTracks()}
                    {displayArtists()}
                    {displayAlbums()}
                </> :
                <h3>No results to display.</h3>
            }
        </section>
    );
}

const styles = {
    container: {
        padding: "10px",
    },
    cardList: {
        display: "flex",
        flexWrap: "wrap",
        gap: "5px",
        justifyContent: "center",
    },
    card: {
        border: "1px solid black",
        borderRadius: "5px",
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        width: "300px",
        justifyContent: "space-between",
    },
    categoryName: {
        textAlign: "center",
        cursor: "pointer",
    },
    textCenter: {
        textAlign: "center",
    },
    details: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    button: {
        alignSelf: "center",
    },
    image: {
        alignSelf: "center",
    }
}