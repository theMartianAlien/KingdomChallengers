import { useLoaderData } from "react-router-dom";
import classes from './ChallengeList.module.css';
import ChallengeCard from "./ChallengeCard";

export default function ChallengeList() {
    const { challenges } = useLoaderData();
    return (
        <>
            <div className={classes["challenges-container"]}>
                <div>
                    <ul>
                        {challenges.filter(x => x.status === 'ready' && x.challengeType === 'open').map(challenge => (
                            <li key={challenge._id}>
                                <ChallengeCard challenge={challenge} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <ul>
                        {challenges.filter(x => x.status === 'ready' && x.challengeType === 'close').map(challenge => (
                            <li key={challenge._id}>
                                <ChallengeCard challenge={challenge} />
                            </li>
                        ))}
                    </ul>
                </div>
                {/* <div>
                    <ul>
                        {challenges.filter(x => x.status === 'agreed').map(challenge => (
                            <li key={challenge.id}>
                                <ChallengeCard challenge={challenge} />
                            </li>
                        ))}
                    </ul>
                </div> */}
            </div>
        </>
    );
}