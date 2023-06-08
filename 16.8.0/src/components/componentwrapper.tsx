import { FC } from "react";

import LinkButton from "./linkbutton";

const ComponentWrapper: FC = ({ children }) => {
  return (
    <div style={{ position: "relative" }}>
      {children}
      <LinkButton />
    </div>
  );
};

export default ComponentWrapper;
