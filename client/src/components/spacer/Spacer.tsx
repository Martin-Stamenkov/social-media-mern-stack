import React from "react";

interface ISpacer {
  height?: number;
  width?: number;
}

const defaultValues = {
  width: 10,
  height: 10,
};

export const Spacer: React.FC<ISpacer> = ({
  width = defaultValues.width,
  height = defaultValues.height,
  children,
}) => {
  return <div style={{ width, height }}>{children}</div>;
};
