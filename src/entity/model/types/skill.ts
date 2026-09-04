export interface SkillItem {
    name: string
    slug: string //CDN 서비스 DEVICON 슬러그
}

export interface SkillGroup {
    category: string
    items: SkillItem[]
}

export const SKILLS: SkillGroup[] = [
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

export const iconUrl = (slug: string) =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}.svg`