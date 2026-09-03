const CAREER = [
    {id: 1, period: '2025.12.22 - 2026.02.27', title: 'Programmers_Dev_Course 백엔드 단기 심화', desc: 'MSA아키텍처와 SpringAI를 활용한 백엔드 개발'}
]

export default function careerPage() {
    return (
        <main>
            <div><h2>Career</h2></div>
            <ul>
                {CAREER.map(c => (
                    <li key={c.id}>
                        <span>{c.period}</span>
                        <h3>{c.title}</h3>
                        <p>{c.desc}</p>
                    </li>
                ))}
            </ul>
        </main>
    )
}