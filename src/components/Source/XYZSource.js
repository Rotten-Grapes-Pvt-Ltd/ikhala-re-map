import React from "react";
import XYZ from "ol/source/XYZ";

const XYZSource = (url) => {
  return new XYZ({
    attributions:
      'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
      'rest/services/World_Imagery/MapServer">ArcGIS</a>',
    url,
  });
};

export default XYZSource;
