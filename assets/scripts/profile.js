const getRecentGamesData = () => {
    const data = [
        {
            status: "win",
            date: "08:17:13AM, 25/10/2022"
        },
        {
            status: "lose",
            date: "12:17:13AM, 22/10/2022"
        },
        {
            status: "lose",
            date: "03:17:13PM, 21/10/2022"
        },
        {
            status: "win",
            date: "01:17:13AM, 21/10/2022"
        },
        {
            status: "draw",
            date: "11:17:13AM, 20/10/2022"
        },
    ]

    return data
}

const getProfileStatus = () => {
    const data = {
        wins: 20,
        losses: 50,
        draw: 30
    }

    return data
}