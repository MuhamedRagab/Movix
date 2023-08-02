import GoogleFontLoader from "react-google-font-loader";

const FontLoader = () => {
  <GoogleFontLoader
    fonts={[
      {
        font: "Bungee Inline",
        weights: [400, "400i", 500, 600, 700],
      },
    ]}
  />;
};

export default FontLoader;
