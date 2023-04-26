import React, { lazy, Suspense, FC } from "react";
import { View, StyleProp, ImageStyle, ImageSourcePropType } from "react-native";

const ImageLoader = lazy(() => import("./ImageLoader"));
type Props = {
  src?: string | undefined;
  style: StyleProp<ImageStyle>;
  srcR?: ImageSourcePropType;
  IMAGE_NOT_FOUND?: ImageSourcePropType;
};

const LaziImageLoader: FC<Props> = ({ src, style, IMAGE_NOT_FOUND, srcR }) => {
  return (
    <Suspense fallback={<View />}>
      <ImageLoader
        IMAGE_NOT_FOUND={IMAGE_NOT_FOUND}
        srcR={srcR}
        src={src}
        style={style}
      />
    </Suspense>
  );
};

export default LaziImageLoader;
