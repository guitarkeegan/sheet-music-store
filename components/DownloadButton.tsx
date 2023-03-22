"use client"
import { downloadCharts } from "@/lib/api"
import {MouseEventHandler, useState} from "react"
type DownloadButtonProps = {
    downloadUrl: string,
    title: string,
}

export default function DownloadButton({downloadUrl, title}: DownloadButtonProps){


    const handleDownload = async (e) => {
        console.log(e.currentTarget.value)
        const filename = e.currentTarget.value
        await downloadCharts(filename)
    }

    return (
        <button value={downloadUrl} onClick={handleDownload}>download {title}</button>
    )
}