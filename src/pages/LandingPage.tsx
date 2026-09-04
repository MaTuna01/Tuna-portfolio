import styles from "../styles/LandingPage.module.css"
import profileImg from '../esset/images/증명사진.jpg'
import { SKILLS, iconUrl } from "../entity/model/types/skill.ts";
import { Qualifications } from "../entity/model/types/Qualification.ts"
import { PROFILE } from "../entity/model/types/profile.ts"
export default function LandingPage() {

    return (
        <div className={styles.landing}>
            <p className={styles.slogan}>Do After Thinking</p>
            <section className={styles.about}>
                    <img className={styles.avatar} src={profileImg} alt='avatar'/>
                    <ul className={styles.profile}>
                        {PROFILE.map(({ icon: Icon, label, value, href }) => (
                            <li key={label} className={styles.infoItem}>
                                <Icon size={20} aria-hidden />
                                {/*링크가 있으면 링크로, 없으면 span 태그로*/}
                                {href ? <a href={href}>{value}</a> : <span>{value}</span>}
                            </li>
                        ))}
                        <li className={styles.infoItem}>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt='github' width={24} height={24}/>
                            <a href="https://github.com/MaTuna01">MaTuna01</a>
                        </li>
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
                <ul className={styles.qualification}>
                    {Qualifications.map((item) => (
                        <li key={item.name}>{item.name}
                        <span>{item.date}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}