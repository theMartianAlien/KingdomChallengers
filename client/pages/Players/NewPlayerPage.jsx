import PlayerForm from "../../components/Players/PlayerForm";

export default function NewPlayerPage() {
    return (
        <>
            <h1>New Player</h1>
            <PlayerForm method='post' />
        </>
    );
}