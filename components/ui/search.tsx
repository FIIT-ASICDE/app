'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function Search({ placeholder, className }: { placeholder: string, className?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Input
            placeholder={placeholder}
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('query')?.toString()}
            className={className}
        />
    );
}