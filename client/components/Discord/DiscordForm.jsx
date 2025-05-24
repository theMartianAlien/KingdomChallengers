import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import InputField from "../UI/Fields/InputField";
import CheckField from "../UI/Fields/CheckField";
import CustomButton from "../UI/Buttons/CustomButton";
import { getAdminToken } from "../../util/auth";
import { usePatchPostFetch } from "../../hooks/useFetch";

export default function DiscordForm({ method }) {
    const discordUser = useRouteLoaderData('discord-detail');
    return (
        <>
            <Form action={`/discord/${discordUser?._id}${method === 'patch' ? `/edit` : `/new`}`} method={method} className="max-w-sm mx-auto">
                <InputField
                    label="Discord Handle"
                    defaultValue={discordUser?.discord_handle}
                    elementName="discord_handle"
                    placeholder="Provide discord handle/username"
                    required
                />
                <InputField
                    label="User Key"
                    defaultValue={discordUser?.user_key}
                    elementName="user_key"
                    placeholder="Provide user key"
                    required
                />
                <CheckField
                    label="Is Admin"
                    elementName="isAdmin"
                    defaultChecked={discordUser?.isAdmin}
                />
                <CustomButton className="bg-blue-800" type="submit">Save</CustomButton>
            </Form>
        </>
    );
}

export async function action({ request, params }) {
    const method = request.method;
    const adminToken = getAdminToken();
    const data = await request.formData();
    const discord_handle = data.get('discord_handle');
    const user_key = data.get('user_key');
    let discordData = {
        _id: params.id,
        discord_handle,
        user_key
    }
    const isAdmin = data.get('isAdmin');
    if (isAdmin) {
        discordData.isAdmin = isAdmin
    }
    const resData = await usePatchPostFetch("discord", method, discordData, adminToken);

    let redirectText = '/discord';
    if (method === 'PATCH') {
        redirectText += "/" + discordData._id
    }

    if (resData.status === 422 || resData.status === 401 || resData.status === 404) {
        return resData;
    }

    return redirect(redirectText);
}