import type { Order } from "@/src/store"

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

type SheetMusicOrderParams = {
    orders: Order[]
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
         json: false,
    })
}

export const getCart = async (sheetmusic: SheetMusicOrderParams) => {
    return await fetcher(
        {
            url: "/api/cart",
            body: sheetmusic,
            method: "POST",
        }
    )
}

export const checkoutCart = async (sheetmusic: SheetMusicOrderParams) => {
    return await fetcher(
        {
            url: "/api/checkout",
            body: sheetmusic,
            method: "POST"
        }
    )
}

export const login = async (user: SignUpParams) => {
    return await fetcher({
      url: "/api/login",
      method: "POST",
      body: user,
      json: false,
    });
  };

  export const logout = async () => {
    return await fetcher({
      url: "/api/logout",
      method: "POST",
      body: {},
      json: false,
    });
  };