const destructorData = data => {
    const { id, photo, link, plays, likes, downloads, song_farsi, artist_farsi } = data

    return { id, photo, link, plays, likes, downloads, song_farsi, artist_farsi }
}

export { destructorData }


