export async function useGetFetch(endpoint) {
    const response = await fetch('http://localhost:3000/' + endpoint);
    if (!response.ok) {

    } else {
        const resData = await response.json();
        return resData;
    }
}