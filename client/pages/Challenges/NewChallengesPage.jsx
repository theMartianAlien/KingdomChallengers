import ChallengeForm from "../../components/Challenges/ChallengesForm";

export default function NewChallengePage() {
    return (
        <>
            <div>
                <h2>New Challenge</h2>
                <ChallengeForm method={"post"} />
            </div>
        </>
    );
}