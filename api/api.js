

export async function fetchAll() {
    try {
        const response = await fetch(`https://plp-assignment-kiosk-sign-in-backend-1.onrender.com`);
        const result = await response.json();
        return result
    } catch (error) {
        return error
    }
}