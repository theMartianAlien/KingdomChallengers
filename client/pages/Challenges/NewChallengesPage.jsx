import ChallengeForm from "../../components/Challenges/ChallengesForm";

export default function NewChallengePage() {
    return (
        <>
            <div>
                <ChallengeForm method={"post"} />
            </div>
        </>
    );
}