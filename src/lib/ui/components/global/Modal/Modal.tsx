"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    id?: string;
    children: React.ReactNode;
}

export default function Modal({ id, children }: ModalProps) {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.id === id) {
                closeModal(id);
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [id]);

    return (
        <>
            <div id={id} className={`hidden overflow-y-auto overflow-x-hidden fixed inset-0 bg-black/50 z-50  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                {children}
            </div>
        </>
    )
}

export function openModal(id: string) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
    }
}

export function closeModal(id: string) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
    }
}
