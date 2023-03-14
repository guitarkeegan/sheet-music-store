"use client"

import { useRef } from 'react'

import { useStore } from "@/src/store"

function StoreInitializer(){
    const initialized = useRef(false)
    if (!initialized){
        useStore.setState({order: []})
    }
    return null;
}

export default StoreInitializer