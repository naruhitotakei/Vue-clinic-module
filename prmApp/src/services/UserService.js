export async function login(loginEmail, loginPassword) {

    const rawResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'loginEmail': loginEmail, 'loginPassword': loginPassword})
    });
    return await rawResponse.json();
}

export async function sso() {

    const response = await fetch('/api/login');
    return await response.json();
}