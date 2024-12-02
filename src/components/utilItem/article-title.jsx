import React from "react";

const ArticleTitle = ({ title, children }) => {
    return (
        <div className="flex justify-between items-center w-full py-1">
            <h2 className="formbox_title">{title}</h2>
            <div className="flex items-center">{children}</div>
        </div>
    );
};

export default ArticleTitle;
