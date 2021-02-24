export async function login (loginEmail, loginPassword) {
    const rawResponse = await fetch('/api/login', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'loginEmail': loginEmail, 'loginPassword': loginPassword})
    });
    return await rawResponse.json();
}