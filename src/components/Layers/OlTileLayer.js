import React, { useContext, useEffect } from "react";
import TileLayer from "ol/layer/Tile";
import useMapStore from "../zustore/mapStore";

const OlTileLayer = ({ source, zIndex, opacity, name }) => {
  const map = useMapStore((state) => state.map);
  useEffect(() => {
    if (!map) return;

    let tLayer = new TileLayer({
      source,
      zIndex,
      opacity,
      name,
    });
    map.addLayer(tLayer);
    return () => map.removeLayer(tLayer);
  }, [map]);
  return null;
};

export default OlTileLayer;
