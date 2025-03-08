import { useEffect } from 'react';

/**
 * Пример хука, который обрабатывает горячие клавиши (Ctrl+S, Delete)
 * и вызывает переданные колбэки при срабатывании.
 */
interface UseHotkeysOptions {
    onSave?: () => void;
    onDelete?: () => void;
    onCopy?: () => void;
    onPaste?: () => void;
}

export function useHotkeys({
    onSave,
    onDelete,
    onCopy,
    onPaste,
}: UseHotkeysOptions) {

    useEffect(() => {
        console.debug('enabled');

        const handleKeyDown = (e: KeyboardEvent) => {
            const isCtrlOrCmd = e.ctrlKey || e.metaKey;
            const key = e.key.toLowerCase();
            console.log(key);
            if (isCtrlOrCmd && e.key.toLowerCase() === 's') {
                e.preventDefault();
                onSave?.();
            }
            if (e.key === 'Delete') {
                onDelete?.();
            }
            if (isCtrlOrCmd && key === 'c') {
                onCopy?.();
            }
            if (isCtrlOrCmd && key === 'v') {
                onPaste?.();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onSave, onDelete, onCopy, onPaste]);
}
