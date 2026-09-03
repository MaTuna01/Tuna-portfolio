import styles from "../styles/LandingPage.module.css"
import profileImg from '../esset/images/증명사진.jpg'

export default function LandingPage() {

    // 스킬 아이콘 출력을 위해 이름과 slug로 저장
    const SKILLS = [
        { category: 'Language', items: [
                { name: 'Java', slug: 'java/java-original' },
                { name: 'C++', slug: 'cplusplus/cplusplus-original' },
                { name: 'Python', slug: 'python/python-original' },
            ]},
        { category: 'Backend', items: [
                { name: 'Spring Boot', slug: 'spring/spring-original' },
                { name: 'FastAPI', slug: 'fastapi/fastapi-original' },
            ]},
        { category: 'Frontend', items: [
                { name: 'React', slug: 'react/react-original' },
            ]},
        { category: 'Data · DevOps', items: [
                { name: 'MySQL', slug: 'mysql/mysql-original' },
                { name: 'Redis', slug: 'redis/redis-original' },
                { name: 'Docker', slug: 'docker/docker-plain'},
                { name: 'Apache Kafka', slug: 'apachekafka/apachekafka-original' },
                { name: 'Elasticsearch', slug: 'elasticsearch/elasticsearch-original' },
                { name: 'Kubernetes', slug: 'kubernetes/kubernetes-original' },
                { name: 'Grafana', slug: 'grafana/grafana-original' },
                { name: 'Prometheus', slug: 'prometheus/prometheus-original' },
            ]},
    ]

    // devicons에서 제공하는 이미지 url을 slug로 출력
    const iconUrl = (slug: string) =>
        `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}.svg`

    return (
        <div className={styles.landing}>
            <h2>about me</h2>
            <p>능동적으로 사고하는 백엔드 개발자 마찬영입니다.</p>
            <section className={styles.about}>
                <div/>
                    <img className={styles.avatar} src={profileImg}/>
                    <ul>
                        <li>2001.03.17</li>
                        <li>phone:010-6277-5386</li>
                        <li>email : ma775100@gmail.com</li>
                        <li>학력 : 국립공주대학교 소프트웨어학과 (2027.02 졸업예정)</li>
                        <li><a href="https://github.com/MaTuna01">https://github.com/MaTuna01</a></li>
                    </ul>
            </section>

            <section className={styles.skills}>
                <h2>skills</h2>
                {SKILLS.map((group => (
                    <div key={group.category} className={styles.skillGroup}>
                        <h3>{group.category}</h3>
                        <ul className={styles.skillList}>
                            {group.items.map(item => (
                                <li key={item.name} className={styles.skillItem}>
                                    <img src={iconUrl(item.slug)} alt={item.name} width={40} height={40} loading="lazy"/>
                                    <span className={styles.itemName}>{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )))}
            </section>

            <section className={styles.Qualification}>
                <h2>Qualifications</h2>
                <ul>
                    <li>정보처리기사</li>
                    <li>ADsP</li>
                    <li>SQLD</li>
                    <li>리눅스마스터 2급</li>
                    <li>네트워크관리사</li>
                    <li>AWS Certified Developer - Associate</li>
                </ul>
            </section>
        </div>
    )
}