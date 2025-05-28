import classes from './BetsList.module.css';
import images from '../../util/IMAGES';
import { Card } from 'flowbite-react';

export default function BetCard({ bet, data }) {
    return (
        <Card className="max-w-sm" imgSrc={`${images[bet.status === 'ongoing' ?
            bet.status : bet.status === 'complete' ?
                'complete' : 'void'].link}.jpg`} imgAlt={bet.title}>
            <h5 className={`text-2xl font-bold tracking-tight ${classes.title}`}>
                {bet.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {bet.teamA
                    .map((p) => (p.display_name))
                    .join(", ")}
                &nbsp;VS&nbsp;
                {bet.teamB
                    .map((p) => (p.display_name))
                    .join(", ")}
            </p>
        </Card>
    );
}