import { useEffect, useState } from "react";
import authService from "../services/auth.service";

export default function Home() {
    const [results, setResults] = useState(null);
    const [tracksCollapsed, setTracksCollapsed] = useState(false);
    const [albumsCollapsed, setAlbumsCollapsed] = useState(false);
    const [artistsCollapsed, setArtistsCollapsed] = useState(false);

    useEffect(() => {
        authService.setResultsSubscription(setResults);
    }, []);

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
                            const cardStyle = {
                                ...styles.card,
                                background: `url("${albumImage.url}")`
                            }

                            return (
                                <div style={cardStyle} key={id}
                                    onClick={() => window.open(spotify, "_blank")}>
                                    <div style={styles.cardBody}>
                                        <h3 style={styles.cardTitle}>{name}</h3>
                                        <div>
                                            <p>Artist: {artists[0].name}</p>
                                            <p>Album: {album.name}</p>
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
                                    </div>
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
                                const cardStyle = {
                                    ...styles.card,
                                    background: `url("${artistImage?.url ? artistImage.url : "./Missing_Placeholder.png"}")`
                                }

                                return (
                                    <div style={cardStyle} key={id}
                                        onClick={() => window.open(spotify, "_blank")}>
                                        <h3 style={styles.cardBody}>{name}</h3>
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
                                const cardStyle = {
                                    ...styles.card,
                                    background: `url("${albumImage.url}")`
                                }

                                return (
                                    <div style={cardStyle} key={id}
                                        onClick={() => window.open(spotify, "_blank")}>
                                        <div style={styles.cardBody}>
                                            <h3 style={styles.textCenter}>Name: {name}</h3>
                                            <div>
                                                <p>Artist: {artists[0].name}</p>
                                                <p>Number of Tracks: {total_tracks}</p>
                                            </div>
                                        </div>
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
            {
                results?.artists || results?.albums || results?.tracks ?
                <>
                    {displayTracks()}
                    {displayArtists()}
                    {displayAlbums()}
                </> :
                <div style={styles.noResultsContainer}>
                    <img src="./Spotify_Logo_Green.png"
                        width={50}
                        height={50}/>
                    <hgroup>
                        <h1 style={styles.noResultsTitle}>No Results</h1>
                        <p style={styles.noResultsSubtitle}>Please type in a search query to get started...</p>
                    </hgroup>
                </div>
            }
        </section>
    );
}

const styles = {
    container: {
        padding: "10px",
    },
    noResultsContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    noResultsTitle: {
        textAlign: "center",
        color: "white",
    },
    noResultsSubtitle: {
        textAlign: "center",
        color: "#7a7a7a",
    },
    cardList: {
        display: "flex",
        flexWrap: "wrap",
        gap: "5px",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        border: "1px solid black",
        borderRadius: "5px",
        padding: "5px",
        width: "300px",
        color: "white",
        height: "250px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    cardBody: {
        backgroundColor: "#00000099",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "5px",
        borderRadius: "5px",
    },
    categoryName: {
        textAlign: "center",
        cursor: "pointer",
        color: "white",
    },
    textCenter: {
        textAlign: "center",
    },
    details: {
        color: "white",
        backgroundColor: "#00000099",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    }
}