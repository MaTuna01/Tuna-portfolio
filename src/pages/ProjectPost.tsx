import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactMarkDown from "react-markdown"


export default function ProjectPage() {

    const {slug} = useParams()
    const {content, setContent} = useState("")

    useEffect(() => {
        fetch(`/projects/${slug}.md`)
            .then(res => {
                if(!res.ok) throw new Error('not exist')
                return res.text()
            })
    }, [slug])

    return (
        <>
            <h1>Project</h1>
            <ReactMarkDown>{content}</ReactMarkDown>
        </>
    )
}

