export interface Career {
    id: number
    period: string
    title: string
    desc: string
}

export const Careers: Career[] = [
    { id: 1, period: '2026.07 ~ 진행중', title: '현대오토에버 모빌리티 SW 스쿨 4기 (웹/앱)', desc: '웹/앱 개발 및 MSA 아키텍처를 활용한 ERP 시스템 개발' },
    {id: 2, period: '2025.12.22 - 2026.02.27', title: 'Programmers_Dev_Course 백엔드 단기 심화', desc: 'MSA아키텍처와 SpringAI를 활용한 백엔드 개발'},
    {id: 3, period: '2024.11', title: '한이음 공모전 프로보노 트랙 입선', desc: '청각 장애인을 위한 위험 소리탐지 경고 안드로이드 애플리케이션 개발'}
]