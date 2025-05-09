import { Link } from 'react-router-dom';
import classes from './BetsList.module.css';
import images from '../../util/IMAGES';

export default function BetCardList({ bets, data }) {
    return (
        <>
            <ul className={classes.list}>
                {bets.map((bet) => (                   
                    <li key={bet._id} className={classes.item}>
                        <Link to={`/bets/${bet._id}`} className={`${bet.status === 'complete' ? classes.complete : ''}`}>
                            <div className={classes["bet-container"]}>
                                <div className={classes["left-bets-image"]}>
                                    <img src={`${images[bet.status === 'ongoing' ?
                                        bet.status : bet.status === 'complete' ?
                                            'complete' : 'void'].link}.jpg`} alt={bet.title} />
                                </div>
                                <div className={classes["right-bets-image"]}>
                                    <div className={classes.content}>
                                        <span className={classes["bet-title"]}>{bet.title}</span>
                                        <br />
                                        <div className={classes.leparticipants}>
                                            {(bet.players.teamA.map((player) => {
                                                const aPlayer = data.find((p) => p.id === player);
                                                return aPlayer.name
                                            })).join(",")}
                                            &nbsp;VS&nbsp;
                                            {(bet.players.teamB.map((player) => {
                                                const aPlayer = data.find((p) => p.id === player);
                                                return aPlayer.name
                                            })).join(",")}
                                        </div>
                                    </div>
                                    <div className={classes["bet-status"]}>
                                        <p>
                                            Status: <span className={classes.status}>{bet.status}</span>
                                        </p>
                                        {
                                            bet.winner && bet?.winner.trim().length > 0 ? (
                                                <p>
                                                    Winner Team: {
                                                        bet.winner === "teamA" ?
                                                            bet.players.teamA.map((player) => {
                                                                const aPlayer = data.find((p) => p.id === player);
                                                                return aPlayer.name
                                                            }).join(",")
                                                            :
                                                            bet.players.teamB.map((player) => {
                                                                const aPlayer = data.find((p) => p.id === player);
                                                                return aPlayer.name
                                                            }).join(",")
                                                    }
                                                </p>
                                            ) : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>))}
            </ul>
        </>
    );
}