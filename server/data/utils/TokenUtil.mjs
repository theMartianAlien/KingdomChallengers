import Token from "../../models/Token.mjs";

const deleteTokenById = async (accountId) => {
    await Token.findOneAndDelete({accountId}).exec();
}

const TokenUtil = {
    deleteTokenById
}

export default TokenUtil;