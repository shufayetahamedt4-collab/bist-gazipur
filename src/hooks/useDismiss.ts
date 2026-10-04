import React, { useEffect, useRef } from 'react';

/**
 * Dismissal behaviour for full-screen overlays.
 *
 * Every overlay in this app is a `fixed inset-0` element, so while one is open it
 * receives *all* pointer events for the whole viewport. If it cannot be dismissed
 * by keyboard or by clicking away, the page underneath becomes unreachable — the
 * nav dropdowns appear to stop responding because the pointer never arrives.
 *
 * Spread the returned props onto the overlay element:
 *
 *   const { backdropProps } = useDismiss(Boolean(selected), () => setSelected(null));
 *   ...
 *   <div className="fixed inset-0 z-50 ..." {...backdropProps}>
 *
 * A click is only treated as "outside" when it lands on the overlay itself, so
 * nothing inside the panel needs to stop propagation.
 */
export const useDismiss = (isOpen: boolean, onClose: () => void) => {
  // Held in a ref so an inline arrow function in the caller does not re-subscribe
  // the listener on every render.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const backdropProps = {
    onClick: (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) closeRef.current();
    },
  };

  return { backdropProps };
};
