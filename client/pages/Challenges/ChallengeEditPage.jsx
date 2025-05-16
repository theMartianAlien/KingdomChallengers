import ChallengeForm from "../../components/Challenges/ChallengesForm";

export default function ChallengeEditPage() {
    return (
        <>
            <div>
                <ChallengeForm method={"patch"} />
            </div>
        </>
    );
}