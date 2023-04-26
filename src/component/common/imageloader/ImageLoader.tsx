import {
  StyleSheet,
  Image,
  StyleProp,
  ImageStyle,
  ActivityIndicator,
  ImageSourcePropType,
  View,
} from "react-native";
import React, { useState, FC, useEffect } from "react";

type Props = {
  src?: string | undefined;
  style: StyleProp<ImageStyle>;
  srcR?: ImageSourcePropType;
  IMAGE_NOT_FOUND?: ImageSourcePropType;
};

const ImageLoader: FC<Props> = ({
  src,
  style,
  srcR,
  IMAGE_NOT_FOUND = require("../../../assets/images/404.png"),
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };
  const handleLoadEnd = () => {
    setIsLoading(false);
  };
  const handleLoadError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return <Image source={IMAGE_NOT_FOUND} style={style} />;
  }

  return (
    <>
      {isLoading && (
        <ActivityIndicator
          style={[
            style,
            {
              alignSelf: "center",
              justifyContent: "center",
            },
          ]}
          size={30}
          color={"#4F91FF"}
        />
      )}

      <Image
        source={srcR ? srcR : { uri: src }}
        style={style}
        onError={handleLoadError}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
    </>
  );
};

export default ImageLoader;

const styles = StyleSheet.create({});
