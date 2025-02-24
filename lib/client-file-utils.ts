export async function handleUpload(file: File) {
    if (!file) {
        throw new Error("file can't be null");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/api/files/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Upload failed");
        }

        const data = await response.json();
        return data.hash as string;
    } catch (error) {
        console.error("Error during upload", error);
        return;
    }
}

export async function fetchFile(filename: string): Promise<File | null> {
    try {
        const response = await fetch(`/api/files/${filename}`);

        if (!response.ok) {
            console.error("Failed to fetch file:", response.statusText);
            return null;
        }

        const blob = await response.blob();

        return new File([blob], filename, { type: blob.type });
    } catch (error) {
        console.error("Error fetching file:", error);
        return null;
    }
}

export function imgSrc(img?: string) {
    if (img?.startsWith("https")) {
        return img;
    }
    return img ? `/api/files/${img}` : undefined;
}
