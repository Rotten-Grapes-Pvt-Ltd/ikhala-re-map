import { useContext, useState } from "react";
import "./App.css";
import { DrawInter } from "./components/Interactions/DrawInter";
import { Interactions } from "./components/Interactions/Interactions";
import { AllLayer } from "./components/Layers/AllLayer";
import OlTileLayer from "./components/Layers/OlTileLayer";
import { OSMLayer } from "./components/Layers/OSMLayer";
import { ReOlMap } from "./components/Map/Map";
import { OlTileSource } from "./components/Source/OlTileSource";
import XYZSource from "./components/Source/XYZSource";
import GeoJSON from "ol/format/GeoJSON";
import useMapStore from "./components/zustore/mapStore";

function App() {
  const GeoJSONFormat = new GeoJSON();
  const map = useMapStore((state) => state.map);

  const [drawState, setDrawState] = useState(false);
  const [type, setType] = useState("Point");

  const DrawEnder = (e) => {
    if (type === "LineString") {
      e.feature.setProperties({
        length: e.feature.getGeometry().getLength(),
      });
    } else if (type === "Polygon") {
      e.feature.setProperties({ area: e.feature.getGeometry().getArea() });
    }
  };
  const updateType = (e) => {
    setType(e.target.value);
  };
  const getGeom = () => {
    if (!map) return;

    map.getAllLayers().forEach((l) => {
      if (l.get("name") == "drawlayer") {
        console.log(GeoJSONFormat.writeFeatures(l.getSource().getFeatures()));
      }
    });
  };
  return (
    <div className='App'>
      <ReOlMap center={[23.18709, -32.94573]} zoom={6}>
        <AllLayer>
          <OlTileLayer
            source={XYZSource(
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            )}
          />
        </AllLayer>
        <Interactions>{drawState && <DrawInter type={type} />}</Interactions>
      </ReOlMap>
      <button onClick={() => setDrawState(!drawState)}>Toggle Draw</button>
      <select name='geomType' id='geomType' onChange={updateType}>
        <option value='Point'>Point</option>
        <option value='LineString'>LineString</option>
        <option value='Polygon'>Polygon</option>
      </select>
      <button onClick={getGeom}>Save data</button>
    </div>
  );
}

export default App;
