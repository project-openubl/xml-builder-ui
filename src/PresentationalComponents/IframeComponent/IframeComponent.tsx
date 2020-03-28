import React from "react";
import "./IframeComponent.scss";

interface Props {
  title: string;
  src: string;
  height: string;
  width: string;
}

export const IframeComponent: React.FC<Props> = ({
  title,
  src,
  height,
  width
}) => {
  return (
    <React.Fragment>
      <iframe
        title={title}
        src={src}
        height={height}
        width={width}
        className="IframeComponent_fullheight"
      />
    </React.Fragment>
  );
};
