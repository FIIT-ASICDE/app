import { useEffect } from 'react';

/**
 * Пример хука, который обрабатывает горячие клавиши (Ctrl+S, Delete)
 * и вызывает переданные колбэки при срабатывании.
 */
interface UseHotkeysOptions {
    onSave?: () => void;    // Колбэк при Ctrl+S / Cmd+S
    onDelete?: () => void;  // Колбэк при Delete
    enabled?: boolean;      // Флаг вкл/выкл слушателя
}

export function useHotkeys({ onSave, onDelete, enabled = true }: UseHotkeysOptions) {

    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const isCtrlOrCmd = e.ctrlKey || e.metaKey;

            if (isCtrlOrCmd && e.key.toLowerCase() === 's') {
                e.preventDefault();
                onSave?.();
            }
            if (e.key === 'Delete') {
                onDelete?.();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onSave, onDelete, enabled]);
}
