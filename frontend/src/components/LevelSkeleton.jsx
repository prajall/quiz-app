import React from "react";
import ContentLoader from "react-content-loader";
import { Card } from "./ui/card";

const LevelSkeleton = (props) => (
  <Card className="px-4 w-full h-full flex items-center">
    <ContentLoader
      speed={2}
      width={476}
      height={124}
      viewBox="0 0 476 124"
      backgroundColor="#e1e0e0"
      foregroundColor="#a9a7a7"
      {...props}
    >
      <rect x="104" y="29" rx="3" ry="3" width="133" height="7" />
      <rect x="104" y="62" rx="3" ry="3" width="115" height="5" />
      <circle cx="44" cy="62" r="41" />
      <rect x="105" y="91" rx="3" ry="3" width="89" height="5" />
      <rect x="380" y="47" rx="4" ry="4" width="94" height="29" />
    </ContentLoader>
  </Card>
);

export default LevelSkeleton;
