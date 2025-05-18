import { useLoaderData } from 'react-router-dom';
import CustomTable from '../UI/CustomTable';
import CustomLink from '../UI/CustomLink';

export default function HomeStats() {
    const data = useLoaderData();
    return (
        <>
            <CustomTable
                prefix={"players"}
                primaryColumn="total"
                isAsc={true}
                data={
                    data.map((bet) => {
                        return {
                            _id: bet._id,
                            display_name: bet.display_name,
                            total: bet.total,
                            ongoing: bet.ongoing,
                            void: bet.void,
                            complete: bet.complete,
                            wins: bet.wins,
                            loss: bet.loss,
                        }
                    })}
                columns={[
                    {
                        "column_name": "Player name",
                        "column": "display_name",
                        element: CustomLink
                    },
                    {
                        "column_name": "Total Bets",
                        "column": "total"
                    },
                    {
                        "column_name": "On Going Bets",
                        "column": "ongoing"
                    },
                    {
                        "column_name": "Void",
                        "column": "void"
                    },
                    {
                        "column_name": "Complete",
                        "column": "complete"
                    },
                    {
                        "column_name": "Wins",
                        "column": "wins"
                    },
                    {
                        "column_name": "Loss",
                        "column": "loss"
                    },]}
            />
        </>
    );
}