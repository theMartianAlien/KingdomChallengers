import { clsx } from 'clsx';
import RadioField from './RadioField';

export default function RadioGroupField({
    elementName,
    label,
    defaultValue,
    placeholder,
    required,
    rows = 10,
    divClass,
    labelClass = "block mb-2 text-sm font-medium text-white dark:text-gray-300",
    inputClass = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

}) {
    return (
        <div className={clsx(
            "mb-5",
            divClass
        )}>
            {/* <fieldset>
                <div className="flex items-center mb-4">
                    <label htmlFor="challengeType" className="block ms-2 text-m font-medium text-gray-900 dark:text-gray-300">Challenge Type</label>
                    {challenge && challenge.challengeType === 'open' && (<input value={challenge.challengeType} name="challengeType" type="hidden" />)}
                    {challenge && challenge.challengeType === 'close' && (
                        <>
                            <input value={challenge.challengeType} name="challengeType" type="hidden" />
                            <input value={challenge.participants.join(',')} name="participants" type="hidden" />
                        </>
                    )}
                </div>
                <RadioField
                    elementName="open-challenge"
                    checked={challengeType === 'open'}
                    groupName="challengeType"
                    value="open"
                    label="Open Challenge"
                    disabled={challenge ? true : false}
                    onChange={(e) => OnChangeChallengeType(e)}
                />
                <RadioField
                    elementName="close-challenge"
                    checked={challengeType === 'close'}
                    groupName="challengeType"
                    value="close"
                    label="Close Challenge"
                    disabled={challenge ? true : false}
                    onChange={(e) => OnChangeChallengeType(e)}
                />
            </fieldset> */}
        </div>
    )
}