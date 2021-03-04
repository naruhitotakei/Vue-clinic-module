export async function getAllEnquiries() {
    const rawResponse = await fetch('/api/enquiries', {
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
        }
    });    
    return await rawResponse.json();
}