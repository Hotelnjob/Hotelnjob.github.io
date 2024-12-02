import React from "react";

const Label = ({ isRequired, str }) => {
    return (
        <label className={"flex gap-x-1 items-center font-medium " + (isRequired && "text-red-500")}>
            {str}
            {isRequired && <span className="text-red-500">*</span>}
        </label>
    );
};

export default Label;
