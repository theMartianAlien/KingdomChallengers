import ErrorContent from "../../components/Layout/ErrorContent";
import { useRouteError } from 'react-router-dom';
import MainNavigation from "../../components/Layout/MainNavigation";

export default function ErrorPage() {
    const error = useRouteError();
    let title = 'Something went wrong!';
    let errorMessage = 'There was an error in the routing.'
    let statusCode = 500;

    if (error?.status === 500) {
        statusCode = error.status;
        errorMessage = JSON.parse(error.data).message;
    }

    if (error?.status === 404) {
        statusCode = error.status;
        title = "Object/resource not found!";
    }

    return (
        <>
            <MainNavigation />
            <main className="mt-2">
                <ErrorContent title={title} statusCode={statusCode}>
                    <p>{errorMessage}</p>
                </ErrorContent>
            </main>
        </>
    );
}