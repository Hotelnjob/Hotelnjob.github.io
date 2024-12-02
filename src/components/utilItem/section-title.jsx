import React from "react";

const SectionTitle = ({ icon, title, children }) => {
    return (
        <div className="mb-1 flex justify-between items-center w-full">
            <h2 className="text-2xl pb-1 flex items-center gap-2 text-gray-700 font-bold">
                {icon}
                {title}
            </h2>
            <div className="flex items-center ml-auto">
                {children}
            </div>
        </div>
    );
};


export default SectionTitle;
