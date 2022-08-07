import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import { View } from "ol";
import useMapStore from "../zustore/mapStore";
export const ReOlMap = ({ children, center, zoom }) => {
  const mapRef = useRef();
  const map = useMapStore((state) => state.map);
  const setMap = useMapStore((state) => state.populateMap);
  const destroyMap = useMapStore((state) => state.removeMap);

  // create map
  useEffect(() => {
    let mapObj = new Map({
      layers: [],
      view: new View({
        projection: "EPSG:4326",
        center,
        zoom,
      }),
    });

    mapObj.setTarget(mapRef.current);
    setMap(mapObj);
    return () => {
      mapObj.setTarget(undefined);
      destroyMap();
    };
  }, []);

  // // zoom change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setZoom(zoom);
  }, []);

  // center change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setCenter(center);
  }, []);
  return (
    <div ref={mapRef} className='map'>
      {children}
    </div>
  );
};
