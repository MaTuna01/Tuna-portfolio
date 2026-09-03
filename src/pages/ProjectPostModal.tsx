import {useNavigate, useParams} from "react-router-dom";
import {useProjectBody} from "../shared/lib/useProjectBody.ts";
import {Modal} from "../shared/ui/Modal/Modal.tsx";
import {Markdown} from "../shared/ui/Markdown.tsx";

export default function ProjectPostModal() {
    const {slug} = useParams()
    const navigate = useNavigate()
    const close = () => navigate(-1)
    const {data: content, isLoading, error } = useProjectBody(slug)

    return (
        <Modal title={slug ?? ''} onClose={close}>
            {/*useProjectBody를 통한 상태/에러 공유*/}
            {isLoading && <p>불러오는 중...</p>}
            {error && <p>글을 찾을 수 없습니다.</p>}
            {content && <Markdown source={content} />}
        </Modal>
    )
}