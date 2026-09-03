import {useParams} from "react-router-dom";
import ReactMarkDown from "react-markdown"
import {useProjectBody} from "../shared/lib/useProjectBody.ts";


export default function ProjectPost() {

    const {slug} = useParams()
    // useProjectBody 훅으로 상태관리를 한번에 대체
    const {data: content, isLoading, error} = useProjectBody(slug)

    if (isLoading) return <p>불러오는 중...</p>
    if (error) return <p>글을 찾을 수 없습니다.</p>

    return (
        <>
            <h1>Project</h1>
            {/*content의 타입이 undefined가 올 경우를 방어 하기위한 조치*/}
            <ReactMarkDown>{content ?? ''}</ReactMarkDown>
        </>
    )
}

