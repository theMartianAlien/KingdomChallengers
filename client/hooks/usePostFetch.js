export async function usePost(endpoint, data) {
    const response = await fetch('http://localhost:3000/' + endpoint,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );
    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (!response.ok) {

    } else {
        const resData = await response.json();
        return resData;
    }
}