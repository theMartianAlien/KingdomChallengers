import DiscordForm from "../../components/Discord/DiscordForm";

export default function DiscordEditPage() {
    return (
        <>
            <div>
                <DiscordForm method={"patch"} />
            </div>
        </>
    );
}