const destructorData = data => {
    const { id, photo, link, plays, likes, downloads, song_farsi, artist_farsi, artist, type } = data

    return { id, photo, link, plays, likes, downloads, song_farsi, artist_farsi, artist, type }
}

export { destructorData }


