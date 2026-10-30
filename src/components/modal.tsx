"use client";

import { useEffect, type ReactNode } from "react";

/** Shared dialog shell: Escape and backdrop close, page scroll pauses while open. */
export function Modal({ label, onClose, children, wide }: { label: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
      <div className={`modal__box ${wide ? "" : "modal__box--sheet"}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

/** The real YouTube embed in a modal. */
export function VideoModal({ id, title, onClose }: { id: string; title: string; onClose: () => void }) {
  return (
    <Modal label={title} onClose={onClose} wide>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="modal__bar">
        <b>{title}</b>
        <button className="btn3d btn3d--white btn3d--sm" onClick={onClose} autoFocus>
          <span>Close</span>
        </button>
      </div>
    </Modal>
  );
}

