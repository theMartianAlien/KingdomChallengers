import { Form } from "react-router-dom";

export default function FormActionButton({ action, method, children }) {
    return (
        <Form action={action} method={method}>
            {children}
        </Form>
    );
}