import React, { useState } from "react";

export function ReadMore({ children, maxCharacterCount = 200 }) {
  const text = children;
  const [isTruncated, setIsTruncated] = useState(true);
  if (typeof children !== "string") return children;

  const resultString = isTruncated ? text.slice(0, maxCharacterCount) : text;
  if (resultString === text && isTruncated) return <span>{text}</span>;

  function toggleTruncated() {
    setIsTruncated(!isTruncated);
  }

  return (
    <React.Fragment>
      <span>{resultString}...</span>
      <span onClick={toggleTruncated} className="tagReadMore">
        {isTruncated ? " Xem thêm" : " Rút gọn"}
      </span>
    </React.Fragment>
  );
}
