import {ImageCopy, Message,} from "@/components/MessageToast/styled";
import {tx} from "@/utils/functions";
import * as React from "react";
import {useState} from "react";
import {toast} from "react-toastify";

interface MessageToastProps {
    message: string
}

export const MessageToast = ({message}: MessageToastProps) => {
    const [hasCopy, setHasCopy] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(tx(message)).then(() => {
            setHasCopy(true);
            setTimeout(() => {
                setHasCopy(false);
            }, 1000);
            toast.info(tx("copiedMessage"), {
                position: "bottom-center",
                autoClose: 300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    };


    return (
        <Message>
            <span>{tx(message)}</span>
            <ImageCopy
                onClick={hasCopy ? () => {
                } : handleCopy}
                src={hasCopy ? "../images/copied.svg" : "../images/copy.svg"}
                alt={hasCopy ? tx("copiedMessage") : tx("copyMessage")}
                title={hasCopy ? tx("copiedMessage") : tx("copyMessage")}
                width={15}
                height={15}
            ></ImageCopy>
        </Message>
    );
};
