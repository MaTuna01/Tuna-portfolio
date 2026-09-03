export default function careerPage() {

    const CAREER = [
        {id: 1, period: '2026.07 ~ 진행중', title: '현대오토에버 모빌리티 SW 스쿨 4기 (웹/앱)', desc: '웹/앱 개발 및 MSA 아키텍처를 활용한 ERP 시스템 개발'},

        {id: 2, period: '2025.12.22 - 2026.02.27', title: 'Programmers_Dev_Course 백엔드 단기 심화', desc: 'MSA아키텍처와 SpringAI를 활용한 백엔드 개발'},

        {id: 3, period: '2024.11', title: '한이음 공모전 프로보노 트랙 입선'}
    ]

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