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
                                            {data.filter((p) => bet.teamA.includes(p._id)).map((p) => (p.display_name)).join(", ")}
                                            &nbsp;VS&nbsp;
                                            {data.filter((p) => bet.teamB.includes(p._id)).map((p) => (p.display_name)).join(", ")}
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
                                                            data.filter((p) => bet.teamA.includes(p._id)).map((p) => (p.display_name)).join(", ")
                                                            :
                                                            data.filter((p) => bet.teamB.includes(p._id)).map((p) => (p.display_name)).join(", ")
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