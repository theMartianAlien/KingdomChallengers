import { Link } from "react-router-dom";
import classes from './ChallengeCard.module.css';

export default function ChallengeCard({ challenge }) {
    return (
        <>
            <Link to={`/challenges/${challenge._id}`}>
                <div className={classes.card + " text-left"}>
                    <div className={classes["card-body"]}>
                        <h3 className={classes["card-title"]}>{challenge.title}</h3>
                        <p className={classes["card-text"]}>{challenge.statement}</p>
                    </div>
                    <div className={classes["card-footer"]}>
                        <p>
                            Challenge ends on <span>
                                {new Date(challenge.challengeEndDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </span>
                        </p>
                    </div>
                </div>
            </Link>
        </>
    );
}