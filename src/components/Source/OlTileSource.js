import TileWMS from "ol/source/TileWMS";

export const OlTileSource = (url, params) => {
  return new TileWMS({
    url,
    params,
  });
};
