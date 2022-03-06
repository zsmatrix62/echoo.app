import {useEffect, useState} from "react";

export const useConfirmBrowserExit = (
    defaultEnabled = true,
    message = "Are you sure you want to exit?"
) => {
    const [msg, setMsg] = useState<string>(message);
    const [enabled, setEnabled] = useState<boolean>(defaultEnabled);

    useEffect(() => {
        function listener(e: BeforeUnloadEvent) {
            if (enabled) {
                e.preventDefault();
                e.returnValue = msg;
                return msg;
            }
        }

        window.addEventListener('beforeunload', listener);

        return () => {
            window.removeEventListener('beforeunload', listener);
        };
    }, [msg, enabled]);

    return {
        enable(): void {
            setEnabled(true);
        },
        disable(): void {
            setEnabled(false);
        },
        setMessage(newMessage: string): void {
            setMsg(newMessage);
        },
        getMessage(): string {
            return msg;
        },
        setEnabled(status: boolean): void {
            setEnabled(status);
        },
        getEnabled(): boolean {
            return enabled;
        },
    };
};