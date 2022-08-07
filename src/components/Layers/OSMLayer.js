import React, { useContext, useEffect } from "react";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import useMapStore from "../zustore/mapStore";
export const OSMLayer = () => {
  const map = useMapStore((state) => state.map);

  let OsmLayer = new TileLayer({
    source: new OSM(),
  });
  useEffect(() => {
    if (!map) return;

    map.addLayer(OsmLayer);
    return () => {
      if (map) {
        map.removeLayer(OsmLayer);
      }
    };
  }, [map]);
  return null;
};
