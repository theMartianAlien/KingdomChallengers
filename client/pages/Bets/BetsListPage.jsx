import BetsList from '../../components/Bets/BetsList'

export default function BetsListPage() {

    return (
        <>
            <h1>List of Bets</h1>
            <BetsList />
        </>
    );
}

export async function loader() {
    const response = await fetch('http://localhost:3000/bets');
    if (!response.ok) {

    } else {
        const resData = await response.json();
        return resData;
    }
}