import {Careers} from "../entity/model/career.ts";

export default function careerPage() {

    return (
        <section>
            <div><h2>Career</h2></div>
            <ul>
                {Careers.map(c => (
                    <li key={c.id}>
                        <span>{c.period}</span>
                        <h3>{c.title}</h3>
                        <p>{c.desc}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}