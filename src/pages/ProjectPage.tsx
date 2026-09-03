import {useQuery} from "@tanstack/react-query";
import {getProjects} from "../shared/api/getProjects.ts";
import {Link, useLocation} from "react-router-dom";

export default function ProjectPage() {
    const location = useLocation()
    const { data: projects, isLoading, error } = useQuery({
        queryKey: ['projects'], queryFn: getProjects,
    })

    if (isLoading) return <p>불러오는 중...</p>
    if (error)     return <p>에러: {String(error)}</p>

    return (
        <main>
            <div><h2>projects</h2></div>

            <ul>
                {projects?.map(project => (
                    <li key={project.id}>
                        <Link
                            to={`/projects/${project.slug}`}
                            state={{ backgroundLocation: location }}   // ⬅ 모달 대비. 지금 넣어도 무해
                        >
                            <h3>{project.title}</h3>
                            <p>{project.summary}</p>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* 챗봇 버튼 — 클릭 이벤트는 나중. 지금은 자리만 */}
            <button type="button" aria-label="프로젝트 챗봇">💬</button>
        </main>
    )
}