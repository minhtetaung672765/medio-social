
// The following piece of code demostrates how the data is fetched
// - in standart approach - without the use of React Router 

import { useEffect, useState } from "react";

function Home() {

    const [data, setData] = useState();

    useEffect(() => {
        const api = import.meta.env.VITE_API;

        // fetch returns a promise
        fetch(`${api}/content/posts`).then(async (res) => {
            setData(await res.json());
            // .....
        })

    }, [])

    // --------Overview of the approach--------------------
    // Approach 1
    fetch(data)
        .then(res => res.json())
        .then(json => setData(json))

    // Approach 2
    async function fetchData() {
        const res = await fetch(api)
        const json = res.json()

        setData(json);
    }
    fetchData(); // call
    //-------------------------------------------------------

}