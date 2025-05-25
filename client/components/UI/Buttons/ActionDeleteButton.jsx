import { useSubmit } from "react-router-dom";
import clsx from "clsx";

export default function ActionDeleteButton({
    id,
    prefix,
    suffix = 'delete',
    returnId,
    className,
    label = "Delete",
    children,
    windowLabel = 'Are you sure you want to delete?'
}) {
    const submit = useSubmit();

    let subItem = label;
    if(children) {
        subItem = children;
    }

    function startDeleteHandler() {
        const proceed = window.confirm(windowLabel);
        let endpoint = `/${prefix}/${id}${suffix ? '/' + suffix : ''}`;
        if (proceed) {
            const formData = new FormData();
            if (returnId)
                formData.append("id", returnId);
            submit(formData, { method: 'delete', action: endpoint });
        }
    }

    return (
        <button
            className={clsx(
                "w-1/2 text-white font-medium bg-orange-900 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-lg text-sm border px-5 py-2.5 text-center dark:bg-orange-900 dark:hover:bg-orange-700 dark:focus:ring-orange-800",
                className)}
            onClick={startDeleteHandler}>
            {subItem}
        </button>
    );
}