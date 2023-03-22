"use client"
import { downloadCharts } from "@/lib/api"
import {MouseEventHandler, useState} from "react"
type DownloadButtonProps = {
    downloadUrl: string,
    title: string,
}

export default function DownloadButton({downloadUrl, title}: DownloadButtonProps){

    return (
        <a href={downloadUrl}>download</a>
    )
}