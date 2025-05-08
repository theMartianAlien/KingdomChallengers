import { useRouteLoaderData } from 'react-router-dom';
import PlayerForm from "../../components/Players/PlayerForm";

function EditPlayerPage() {
    const { thePlayer } = useRouteLoaderData('player-detail');
    return (
        <PlayerForm player={thePlayer} method='patch'/>
    )
}

export default EditPlayerPage;