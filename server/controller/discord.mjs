import { logError, logMessage } from "../util/logging.mjs";
import DiscordUtil from "../data/utils/DiscordUtil.mjs";
import Discord from "../models/Discord.mjs";

const createDiscordUser = async (req, res, next) => {
    try {
        logMessage("-----------createDiscordUser--------------");
        const discord_handle = req?.body?.discord_handle ?? null
        if (!discord_handle || discord_handle.length <= 4 || discord_handle.length >= 20) {
            logMessage("Invalid discord handle");
            return res.status(422).json({ message: "Invalid discord handle!" });
        }

        const user_key = req?.body?.user_key ?? null
        if (!user_key || user_key.length <= 1 || user_key.length >= 10) {
            logMessage("Invalid user key");
            return res.status(422).json({ message: "Invalid user key!" });
        }

        const discordHandler = await DiscordUtil.findByDiscordHandle(req.body.discord_handle);

        if (discordHandler) {
            logMessage("this discord handle already in the database discord_handler");
            return res.status(422).json({ message: "Unable to add this discord handle" });
        }

        let newDiscordUser = new Discord({
            user_key: user_key,
            discord_handle: discord_handle,
        });

        if (req.body.isAdmin) {
            newDiscordUser.isAdmin = true;
        }

        await newDiscordUser.save();

        logMessage("-----------createDiscordUser--------------");
        res.status(201).json({ message: 'Discord handle added!' });
    } catch (error) {
        next(error);
    }
}

const findAllDiscordUser = async (req, res, next) => {
    try {
        logMessage("-----------findAllDiscordUser--------------");
        const discord_users = await Discord.find();
        logMessage("-----------findAllDiscordUser--------------");
        // res.json(discord_users.map(d => {
        //     return {
        //         discord_handle: d.discord_handle
        //     }
        // }));
        res.json(discord_users);
    } catch (error) {
        logError(error)
        next(error);
    }
}

const findADiscordUser = async (req, res, next) => {
    try {
        logMessage("-----------findADiscordUser--------------");
        const discord_user = await Discord.findById(req.params.id);

        if (!discord_user) {
            logMessage("-----------discord_user--------------");
            return res.status(404).json({ message: 'Discord user not found :' + req.params.id });
        }

        logMessage("-----------findADiscordUser--------------");
        res.json(discord_user);
    } catch (error) {
        logError(error)
        next(error);
    }
}

const updateDiscordUser = async (req, res, next) => {
    try {
        logMessage("-----------updateDiscordUser--------------");
        const discord_user = await Discord.findById(req.params.id);

        const discord_handle = req?.body?.discord_handle ?? null
        if (!discord_handle || discord_handle.length <= 4 || discord_handle.length >= 20) {
            logMessage("Invalid discord handle");
            return res.status(422).json({ message: "Invalid discord handle!" });
        }

        const user_key = req?.body?.user_key ?? null
        if (!user_key || user_key.length <= 1 || user_key.length >= 10) {
            logMessage("Invalid user key");
            return res.status(422).json({ message: "Invalid user key!" });
        }

        const discordHandler = await DiscordUtil.findByDiscordHandle(discord_handle);
        if (discordHandler._id.toString() !== discord_user._id.toString()) {
            logMessage("-----------discordHandler--------------");
            return res.status(422).json({ message: 'Discord handle already taken: ' + discord_handle });
        }

        if (!discord_user) {
            logMessage("-----------discord_user--------------");
            return res.status(404).json({ message: 'Discord user not found: ' + req.params.id });
        }

        discord_user.discord_handle = req.body.discord_handle;
        discord_user.user_key = req.body.user_key;
        if (req.body.isAdmin) {
            discord_user.discord_handle = req.body.discord_handle;
        } else {
            delete discord_user.isAdmin;
        }

        await discord_user.save();

        logMessage("-----------updateDiscordUser--------------");
        res.status(200).json({ message: 'Discord user updated!' });
    } catch (error) {
        logError(error)
        next(error);
    }
}

const deleteDiscordUser = async (req, res, next) => {
    try {
        logMessage("-----------deleteDiscordUser--------------");
        const result = await Discord.findByIdAndDelete(req.params.id);

        if (!result) {
            logMessage("-----------result--------------");
            logMessage(result);
            return res.status(404).json({ message: 'Discord handle not found' });
        }

        logMessage("-----------deleteDiscordUser--------------");
        res.status(200).json({ message: 'Discord user deleted!' });
    } catch (error) {
        logError(error)
        next(error);
    }
}

const DiscordController = {
    createDiscordUser,
    findAllDiscordUser,
    findADiscordUser,
    updateDiscordUser,
    deleteDiscordUser
}

export default DiscordController;