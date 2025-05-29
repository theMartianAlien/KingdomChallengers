import { useRef, useState } from "react";
import {clsx} from 'clsx';

export default function ImageField({
    elementName,
    defaultImage = "",
    divClass,
    label,
    labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
    buttonLabel = "Upload",
    buttonClass,
    inputClass = "rounded flex-grow w-full"
}) {
    const imageInput = useRef();
    const [imageInputValues, setImageInputValues] = useState({
        imageURL: defaultImage,
        isClickable: false
    });

    function onChangeImageURL() {
        setImageInputValues(prevState => {
            return {
                ...prevState,
                isClickable: !(imageInput.current.value.trim().length > 0)
            }
        })
    }

    async function onValidateImageURL() {
        const isValid = await checkImageURL(imageInput.current.value.trim());
        if(isValid) {
            setImageInputValues(prevState => {
                return {
                    ...prevState,
                    imageURL: imageInput.current.value.trim()
                }
            })
        }
    }

    async function checkImageURL(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const contentType = response.headers.get('Content-Type');
            return contentType && contentType.startsWith('image/');
        } catch (e) {
            return false;
        }
    }

    return (
        <>
            <div className={divClass}>
                <label className={labelClass} htmlFor={elementName}>{label}</label>
                <div className="flex flex-start flex-col gap-1">
                    <div className="w-full">
                        {imageInputValues.imageURL && (
                            <img
                                src={imageInputValues.imageURL}
                                alt="Preview"
                                style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
                            />
                        )}
                    </div>
                    <div className="flex flex-start flex-col gap-1 w-full">
                        <div className="w-full flex">
                            <input
                                ref={imageInput}
                                type="text"
                                id={elementName}
                                name={elementName}
                                placeholder="Paste image URL here"
                                defaultValue={imageInputValues.imageURL}
                                onChange={onChangeImageURL}
                                className={inputClass}
                                style={{ width: '250px' }}
                            />
                        </div>
                        <div>
                            <button
                                onClick={onValidateImageURL}
                                disabled={imageInputValues.isClickable}
                                type="submit"
                                className={clsx(
                                    "block w-1/2 text-sm border rounded-lg py-2",
                                    imageInputValues.isClickable ? "text-gray-400 border-gray-900" : "text-black border-black",
                                    buttonClass
                                )}>
                                {buttonLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}