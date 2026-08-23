

export async function fetchAll() {
    try {
        const response = await fetch(`http://localhost:3000`);
        const result = await response.json();
        return result
    } catch (error) {
        return error
    }
}