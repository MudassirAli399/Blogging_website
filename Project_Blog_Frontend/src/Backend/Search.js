
export default async function SearchPost({
    title = "",
    IncrementNumber = 0
}) {
    const searchTitle = title.trim();

    if (!searchTitle) {
        return [];
    }

    try {
        const response = await fetch(import.meta.env.VITE_SEARCH_POST, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                TitleForSearch: searchTitle,
                IncrementNumber: IncrementNumber
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Search request failed");
        }

        // PHP API always returns an array.
        return Array.isArray(data) ? data : [];

    } catch (error) {
        console.error("Search API Error:", error);
        throw error;
    }
}
