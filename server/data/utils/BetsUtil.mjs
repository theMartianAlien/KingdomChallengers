import Bets from '../../models/Bets.mjs';

const findAllBetsByPlayer = async (playerId) => {
    const bets = await Bets.find({
        $or: [
            { 'teamA': playerId },
            { 'teamB': playerId }
        ]
    }).populate('teamA').populate('teamB').exec();
    return bets;
}

const findBetByLink = async(link) => {
    const bets = await Bets.findOne({ 'link': link }).exec();
    return bets;
}

const findAllBetsByStatus = async (status) => {
    const bets = await Bets.find({status}).exec();
    return bets
}

const BetsUtil = {
    findAllBetsByPlayer,
    findAllBetsByStatus,
    findBetByLink
}

export default BetsUtil;