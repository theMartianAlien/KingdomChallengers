export async function useGetFetch(endpoint) {
    const response = await fetch('http://localhost:3000/' + endpoint);
    if (!response.ok) {

    } else {
        const resData = await response.json();
        return resData;
    }
}

export async function usePatchPostFetch(endpoint, method, data) {
    let url = 'http://localhost:3000/';
    if (method === 'PATCH') {
        url += data._id;
    }
    const response = await fetch(url + endpoint, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (!response.ok) {

    } else {
        const resData = await response.json();
        return resData;
    }
}