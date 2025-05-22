import { getTokenForAccount, replaceTokenForAccount, storeTokenForAccount } from "../data/token.mjs";
import { logMessage } from "../util/logging.mjs";

export async function storeTokenForLoggedUser(data) {
    const token = await getTokenForAccount(data.accountId);
    if (token) {
        await replaceTokenForAccount(
            token._id.toString(),
            {
                token: data.token,
                accountId: data.accountId,
                adminToken: data.adminToken,
                eightHours: data.eightHours
            })
        return;
    }
    await storeTokenForAccount(data);
}