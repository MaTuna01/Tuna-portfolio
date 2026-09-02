import {useQuery} from "@tanstack/react-query";
import {getProjects} from "../shared/api/getProjects.ts";
import {Link} from "react-router-dom";

export default function projectPage() {

    const {data:projects, isLoading,error}
    = useQuery({
        queryKey:['projects'],
        queryFn:getProjects
    })

    // 아직 오는중일 경우
    if (isLoading)
        return <p>불러오는 중...</p>

    // 실패했을 경우
    if (error)
        return <p>에러:{String(error)}</p>

    return (
        <ul>
            {projects?.map(project => (
                <li key={project.id}>
                    <Link to={`/project/${project.slug}`}>
                        {project.title}
                    </Link>
                    <p>{project.summary}</p>
                </li>
            ))}
        </ul>
    )
}