export default function LandingPage() {
    return (
        <div>
            <section>
                <div aria-hidden />   {/* 원형 프로필 (ellipse) */}
                <div>
                    <h2>about me</h2>
                    <ul>
                        <li>마찬영</li>
                        <li>2001.03.17</li>
                        <li>ph:010-6277-5386</li>
                        <li>email : ma775100@gmail.com</li>
                        <li>학력 : 국립공주대학교 소프트웨어학과 (2027.02 졸업예정)</li>
                        <li>https://github.com/MaTuna01</li>
                    </ul>
                </div>
            </section>

            <section >
                <h2>skills</h2>
                <ul>
                    <li>Backend</li>
                    <li>FrontEnd</li>
                    <li>DevOps</li>{/* 임시 */}
                </ul>
                <h2>qualifications</h2>
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