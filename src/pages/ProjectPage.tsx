import {useQuery} from "@tanstack/react-query";
import {getProjects} from "../shared/api/getProjects.ts";
import {Link, useLocation} from "react-router-dom";
import style from "../styles/ProjectPage.module.css"

export default function ProjectPage() {
    const location = useLocation()
    const { data: projects, isLoading, error } = useQuery({
        queryKey: ['projects'], queryFn: getProjects,
    })

    if (isLoading) return <p>불러오는 중...</p>
    if (error)     return <p>에러: {String(error)}</p>

    return (
        <section>
            <h2 className={style.project}>projects</h2>
            <hr/>
            <ul>
                {projects?.map(project => (
                    <li key={project.id}>
                        <Link to={`/projects/${project.slug}`} state={{ backgroundLocation: location }}>
                            <h3>{project.title}</h3>
                            <p>{project.summary}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}