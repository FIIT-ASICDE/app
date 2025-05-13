// Custom hook for handling keyboard shortcuts 
import { useEffect } from 'react';

// Interface defining the callback functions for various hotkey actions
interface UseHotkeysOptions {
    onSave?: () => void;    // Callback for save action (Ctrl/Cmd + S)
    onDelete?: () => void;  // Callback for delete action (Delete key)
    onCopy?: () => void;    // Callback for copy action (Ctrl/Cmd + C)
    onPaste?: () => void;   // Callback for paste action (Ctrl/Cmd + V)
}

// Hook that sets up keyboard event listeners for common diagram operations
export function useHotkeys({
    onSave,
    onDelete,
    onCopy,
    onPaste,
}: UseHotkeysOptions) {

    useEffect(() => {
        // Event handler for keyboard shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            // Check for Ctrl key (Windows/Linux) or Command key (macOS)
            const isCtrlOrCmd = e.ctrlKey || e.metaKey;
            const key = e.key.toLowerCase();

            // Handle save operation (Ctrl/Cmd + S)
            if (isCtrlOrCmd && e.key.toLowerCase() === 's') {
                e.preventDefault();  // Prevent browser's save dialog
                onSave?.();
            }
            // Handle delete operation (Delete key)
            if (e.key === 'Delete') {
                onDelete?.();
            }
            // Handle copy operation (Ctrl/Cmd + C)
            if (isCtrlOrCmd && key === 'c') {
                onCopy?.();
            }
            // Handle paste operation (Ctrl/Cmd + V)
            if (isCtrlOrCmd && key === 'v') {
                onPaste?.();
            }
        };

        // Add keyboard event listener when component mounts
        window.addEventListener('keydown', handleKeyDown);
        // Cleanup: remove event listener when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onSave, onDelete, onCopy, onPaste]);
}
