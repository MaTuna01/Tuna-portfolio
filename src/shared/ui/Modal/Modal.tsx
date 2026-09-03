import styles from "../../../styles/Modal.module.css"
import {type ReactNode, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {useLockBodyScroll} from "../../lib/useLockBodyScroll.ts";

interface ModalProps{
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export function Modal({title, onClose, children}:ModalProps){
    const panelRef = useRef<HTMLDivElement>(null);
    const openerRef = useRef<HTMLElement | null>(null);

    useLockBodyScroll();

    useEffect(() => {
        openerRef.current = document.activeElement as HTMLElement;
        panelRef.current?.focus();

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') { onClose(); return }
            if (e.key !== 'Tab') return;

            // 포커스 트랩: Tab이 모달 밖으로 새지 않도록
            const items = panelRef.current?.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
            );

            if (!items?.length) return;

            const first = items[0];
            const last = items[items.length - 1];

            if(!e.shiftKey && document.activeElement === last){
                e.preventDefault(); first.focus();
            } else if (e.shiftKey && document.activeElement === first){
                e.preventDefault(); last.focus();
            }
        }

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            openerRef.current?.focus(); // 닫을 때 원래 있던곳으로 복귀시키기 위함
        };
    }, [onClose]);

    return createPortal(
        <div
            className={styles.overlay}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                ref={panelRef}
                className={styles.panel}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                tabIndex={-1}
            >
                <header className={styles.header}>
                    <h2 id="modal-title" className={styles.title}>{title}</h2>
                    <button type="button" className={styles.close} onClick={onClose} aria-label="닫기">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </header>
                <div className={styles.body}>{children}</div>
            </div>
        </div>,
        document.body,   // 여기가 핵심
    );
}