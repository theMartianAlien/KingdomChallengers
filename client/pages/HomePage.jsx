import HomeStats from "../components/Statistics/HomeStats";
import { useGetFetch } from "../hooks/useFetch";

export default function HomePage() {
    return (
        <>
            <HomeStats/>
        </>
    );
}

export async function loader() {
    return await useGetFetch('');
}