import { useRouteLoaderData } from 'react-router-dom';
import PlayerForm from "../../components/Players/PlayerForm";

function EditPlayerPage() {
    return (
        <PlayerForm method='patch'/>
    )
}

export default EditPlayerPage;