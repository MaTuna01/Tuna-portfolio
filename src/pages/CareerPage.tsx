import {Careers} from "../entity/model/types/career.ts";
import style from "../styles/CareerPage.module.css"

export default function careerPage() {

    return (
        <section>
            <h2 className={style.career}>Career/Education</h2>
            <hr/>
            <ul className={style.list}>
                {Careers.map(c => (
                    <li key={c.id}  className={style.card}>
                        <h3 className={style.title}>{c.title}</h3>
                        <p>{c.desc}</p>
                        <span>{c.period}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}