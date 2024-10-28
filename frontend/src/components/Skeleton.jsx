import React from "react";
import ContentLoader from "react-content-loader";
import { Card } from "./ui/card";

const MyLoader = (props) => (
  <Card className="w-full h-full py-5 px-4 rounded-md">
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 476 124"
      backgroundColor="#f3f3f3"
      foregroundColor="#d2d1d1"
      {...props}
    >
      <rect x="5" y="1" rx="3" ry="3" width="247" height="6" />
      <rect x="-16" y="129" rx="3" ry="3" width="178" height="6" />
      <rect x="337" y="129" rx="3" ry="3" width="178" height="6" />
      <rect x="338" y="128" rx="3" ry="3" width="178" height="6" />
      <rect x="46" y="36" rx="3" ry="3" width="143" height="4" />
      <rect x="5" y="28" rx="4" ry="4" width="21" height="20" />
      <rect x="5" y="68" rx="4" ry="4" width="21" height="20" />
      <rect x="5" y="104" rx="4" ry="4" width="21" height="20" />
      <rect x="46" y="73" rx="3" ry="3" width="143" height="4" />
      <rect x="45" y="112" rx="3" ry="3" width="143" height="4" />
      <rect x="342" y="30" rx="5" ry="5" width="114" height="28" />
      <rect x="342" y="75" rx="5" ry="5" width="114" height="28" />
    </ContentLoader>
  </Card>
);

export default MyLoader;
