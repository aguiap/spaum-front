import { tx } from "@/utils/functions";
import React from "react";
import { MessageError } from "@/components/MessageInputValidations/styles";

interface MessageInputValidationsProps {
  type: string | undefined;
}

export const MessageInputValidations = ({
  type
}: MessageInputValidationsProps) => {
  return (
    <>
      {type === "pattern" && (
        <MessageError>{tx("InputValidations.invalidCharacter")}</MessageError>
      )}
      {type === "minLength" && (
        <MessageError>{tx("InputValidations.minLength")}</MessageError>
      )}
      {type === "required" && (
        <MessageError>{tx("InputValidations.required")}</MessageError>
      )}
    </>
  );
};
