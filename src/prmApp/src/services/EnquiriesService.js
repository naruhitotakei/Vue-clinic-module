export async function getAllEnquiries() {

    const response = await fetch('/api/enquiries');
    return await response.json();
}