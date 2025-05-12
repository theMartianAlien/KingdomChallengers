import { Form } from "react-router-dom";

export default function CounterChallengeForm({ onSubmit }) {
    return (
        <>
            <Form method="post">
                <div className="form-group">
                    <label htmlFor="challenge">Challenge</label>
                    <textarea id="challenge" type="text" name="challenge" />
                </div>
                <div className="form-group">
                    <label htmlFor="punishment">Punishment</label>
                    <textarea id="punishment" type="text" name="punishment" />
                </div>
                <div className="form-group">
                    <label htmlFor="team">Team Side</label>
                    <select
                        name="team"
                        id="team">
                        <option value="against">Against</option>
                        <option value="pro">Pro</option>
                    </select>
                </div>
                <button onClick={onSubmit}>Engage Bet</button>
            </Form>
        </>
    );
}