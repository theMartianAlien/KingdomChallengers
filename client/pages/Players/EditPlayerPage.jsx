import { useRouteLoaderData } from 'react-router-dom';
import PlayerForm from "../../components/Players/PlayerForm";

function EditPlayerPage() {
    const { player } = useRouteLoaderData('player-detail');
    return (
        <PlayerForm method='patch' player={player} />
    )
}

export default EditPlayerPage;