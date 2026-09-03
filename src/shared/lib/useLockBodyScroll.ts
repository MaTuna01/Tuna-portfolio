import {useLayoutEffect} from "react";

export function useLockBodyScroll(){
    useLayoutEffect(() => {
        const {overflow, paddingRight} = document.body.style;
        // 스크롤바가 사라지며 화면이 좌우로 튀는것을 방지
        const gap = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.paddingRight = `${gap}px`;

        return () => {
            document.body.style.overflow = overflow;
            document.body.style.paddingRight = paddingRight;
        }
    }, []);
}