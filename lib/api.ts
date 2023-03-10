type FetcherParams = {
    url: string,
    body: {},
    method: string,
    json?: boolean,
}

type SignUpParams = {
    email: string,
    password: string,
}

const fetcher = async ({url, body, method, json=true}: FetcherParams)=>{
    const res = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })

    if (!res.ok){
        throw new Error("Api error")
    }

    if (json){
        const data = await res.json()
        return data
    }
}

export const signUp = async (user: SignUpParams) => {
    return await fetcher(
        {
         url: "/api/signup",
         body: user,
         method: "POST",
    })
}