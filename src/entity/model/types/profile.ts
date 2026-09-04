import { Calendar, Phone, Mail, GraduationCap, type LucideIcon } from 'lucide-react'

export interface ProfileItem {
    icon: LucideIcon
    label: string
    value: string
    href?: string           // 링크 있으면(이메일·깃허브)
}

export const PROFILE: ProfileItem[] = [
    { icon: Calendar, label: '생년월일', value: '2001.03.17' },
    { icon: GraduationCap, label: '학력', value: '국립공주대학교 소프트웨어학과' },
    { icon: Phone, label: '전화', value: '010-6277-5386' },
    { icon: Mail, label: '이메일',  value: 'ma775100@gmail.com', href: 'mailto:ma775100@gmail.com' },

]