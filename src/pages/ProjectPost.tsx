import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactMarkDown from "react-markdown"


export default function ProjectPage() {

    const {slug} = useParams()
    const [content, setContent] = useState("")

    useEffect(() => {
        fetch(`/projects/${slug}.md`)
            .then(res => {
                if(!res.ok) throw new Error('없는 글')
                return res.text()
            })
            .then(setContent)
            .catch(() => setContent('#글을 찾을 수 없습니다'))
    }, [slug])

    return (
        <>
            <h1>Project</h1>
            <ReactMarkDown>{content}</ReactMarkDown>
        </>
    )
}

