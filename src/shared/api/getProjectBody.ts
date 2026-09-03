// 프로젝트 본문을 fetch하는 함수
export async function getProjectBody(slug: string): Promise<string> {
    const res = await fetch(`/projects/${slug}.md`)
    if (!res.ok) throw new Error("본문을 찾을 수 없습니다.")
    return res.text()
}