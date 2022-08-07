import React, { useContext, useEffect } from "react";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import Draw from "ol/interaction/Draw";
import GeoJSON from "ol/format/GeoJSON";
import useMapStore from "../zustore/mapStore";

export const DrawInter = ({ type, onDrawEnd }) => {
  const map = useMapStore((state) => state.map);
  const GeoJSONFormat = new GeoJSON();
  const source = new VectorSource({ wrapX: false });

  const vector = new VectorLayer({
    source: source,
    name: "drawlayer",
  });

  useEffect(() => {
    if (!map) return;
    let draw = new Draw({
      source,
      type,
    });
    map.addLayer(vector);
    map.addInteraction(draw);
    if (onDrawEnd) {
      draw.on("drawend", onDrawEnd);
    }
    return () => {
      map.removeLayer(vector);
      map.removeInteraction(draw);
      console.log(GeoJSONFormat.writeFeatures(source.getFeatures()));
    };
  }, [type]);
  return null;
};
