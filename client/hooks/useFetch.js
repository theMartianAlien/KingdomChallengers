const URL = import.meta.env.VITE_ENDPOINT || 'http://localhost:3000/';

export async function useGetFetch(endpoint, token) {
    let headers = {
        'Content-Type': 'application/json'
    }
    if (token) {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }


    const response = await fetch(URL + endpoint, {
        method: 'GET',
        headers: headers
    });

    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (!response.ok) {
        throw new Response({
            message: response.statusText,
            status: response.status,
        });
    }

    const resData = await response.json();
    return resData;
}

export async function usePatchPostFetch(endpoint, method, data, token) {
    let url = URL;
    if (method === 'PATCH') {
        endpoint += "/" + data._id;
    }

    let headers = {
        'Content-Type': 'application/json'
    }
    if (token) {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    const response = await fetch(url + endpoint, {
        method: method,
        headers: headers,
        body: JSON.stringify(data)
    });

    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (!response.ok) {
        throw new Response({
            message: response.statusText,
            status: response.status,
        });
    }

    const resData = await response.json();
    return resData;
}

export async function useDeleteFetch(endpoint, token) {

    let headers = {
        'Content-Type': 'application/json'
    }
    if (token) {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    const response = await fetch(URL + endpoint, {
        method: 'DELETE',
        headers: headers
    });

    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (!response.ok) {
        throw new Response({
            message: response.statusText,
            status: response.status,
        });
    }

    const resData = await response.json();
    return resData;
}