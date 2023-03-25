"use client"
import {MouseEventHandler, useState} from "react"
type DownloadButtonProps = {
    downloadUrl: string,
    title: string,
}

export default function DownloadButton({downloadUrl, title}: DownloadButtonProps){

    return (
        <a href={downloadUrl} className="bg-amber-500 text-white rounded-xl px-3 py-1 mb-2 text-lg hover:bg-amber-300 transition-all ease-in-out duration-700 disabled:bg-gray-400 hover:scale-105">download</a>
    )
}