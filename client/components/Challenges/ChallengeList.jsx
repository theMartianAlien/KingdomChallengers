import { useLoaderData} from "react-router-dom";
import ChallengeCard from "./ChallengeCard";

export default function ChallengeList() {
    const { challenges } = useLoaderData();
    return (
        <>
            <div className="flex flex-col items-center justify-center text-center">
                <div className="flex flex-col lg:flex-row lg:gap-4">
                    <div className="flex-1">
                        <ul>
                            {challenges.filter(x => x.status === 'ready' && x.challengeType === 'open').map(challenge => (
                                <li key={challenge._id}>
                                    <ChallengeCard challenge={challenge} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1">
                        <ul>
                            {challenges.filter(x => x.status === 'ready' && x.challengeType === 'close').map(challenge => (
                                <li key={challenge._id}>
                                    <ChallengeCard challenge={challenge} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1">
                        <ul>
                            {challenges.filter(x => x.status === 'locked').map(challenge => (
                                <li key={challenge._id}>
                                    <ChallengeCard challenge={challenge} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}