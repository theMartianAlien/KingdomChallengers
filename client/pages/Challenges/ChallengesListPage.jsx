import { useGetFetch } from "../../hooks/useFetch";
import ChallengeList from '../../components/Challenges/ChallengeList';

export default function ChallengesListPage() {

    return (
        <>
            <div>
                <ChallengeList />
            </div>
        </>
    );
}

export async function loader() {
    return await useGetFetch("challenges");
}