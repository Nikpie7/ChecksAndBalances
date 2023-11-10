import {
  useState,
  useEffect,
  useRef
} from 'react';
import { MapContainer, Marker, GeoJSON, Pane, Popup, TileLayer, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import stateJSON from '../assets/geoJSON/cb_2022_us_state_5m.json';
import districtJSON from '../assets/geoJSON/cb_2022_us_cd118_5m.json';
import { GeoJSON as LeafletGeoJSON, LatLngBounds } from 'leaflet';

const OnboardingPage = () => {
  const [selectedState, setSelectedState] = useState(0);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map)
      return;
    map._renderer.options.padding = 3;
    const nationBounds = [[], []];
    const coords = stateJSON.features[selectedState].geometry.coordinates[1]
      ? stateJSON.features[selectedState].geometry.coordinates.flat(2)
      : stateJSON.features[selectedState].geometry.coordinates[0];
    const bounds = new LatLngBounds(LeafletGeoJSON.coordsToLatLngs(coords));
    map.flyToBounds(bounds)
  }, [selectedState]);

  const onMapReady = (L) => {
    setMap(L.target);
  }
  const onStateClick = (properties) => {
    const state = properties.layer.feature.properties.NAME;
    console.log(state);
  };
  const onStateMouseOver = (properties) => {
    const state = properties.layer.feature.properties.NAME;
    console.log(state);
  };
  const jsonStyle = () => {
    return {
      fill: false,
      weight: 1
    };
  };
  const MapState = () => {
    // const mapMethods = useMap();

    // const coords = stateJSON.features[selectedState].geometry.coordinates[1]
    //   ? stateJSON.features[selectedState].geometry.coordinates.flat(2)
    //   : stateJSON.features[selectedState].geometry.coordinates[0];
    // console.log(coords);
    // const bounds = new LatLngBounds(LeafletGeoJSON.coordsToLatLngs(coords));
    // const map = useMapEvents({
    //   zoom: () => {
    //     map.flyToBounds(bounds)
    //   }
    // });
    // return null;
  };
  return (
    <div className="w-[100vw] h-[100vh]">
      <header className="w-full h-16 flex justify-center items-center">
        {/* <h1 className="text-4xl font-bold">Select a state</h1> */}
        <StateSelect state={selectedState} setState={setSelectedState} />
      </header>
      <main className="h-[90vh]">
        <StateHeader />
        <MapContainer center={[28.601345, -81.198845]} zoom={1} scrollWheelZoom={false} className="h-full" style={{backgroundColor: "white"}} whenReady={onMapReady} >

        <MapState />
          <GeoJSON data={stateJSON} eventHandlers={{click: onStateClick, mouseover: onStateMouseOver}} style={jsonStyle}>

          <Tooltip permanent={true} direction="center" position={[40.633931, -70.667909]}>Rhode Island</Tooltip>
          </GeoJSON>
          {/* <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable!
            </Popup>
          </Marker> */}
          {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
        </MapContainer>
      </main>
    </div>
  );
};

const StateHeader = ({state}) => {
  return (
    <span>
    </span>
  );
};

const StateSelect = ({state, setState}) => {
  const onSelect = e => {
    setState(e.target.value);
  };
  return (<>
<label htmlFor="state">Select a State:</label>
<select name="state" id="state" value={state} onChange={onSelect}>
    <option value="0" defaultValue>Select a state</option>
    <option value="0">Alabama</option>
    <option value="1">Alaska</option>
    <option value="2">Arizona</option>
    <option value="3">Arkansas</option>
    <option value="4">California</option>
    <option value="5">Colorado</option>
    <option value="6">Connecticut</option>
    <option value="7">Delaware</option>
    <option value="8">District of Columbia</option>
    <option value="9">Florida</option>
    <option value="10">Georgia</option>
    <option value="11">Hawaii</option>
    <option value="12">Idaho</option>
    <option value="13">Illinois</option>
    <option value="14">Indiana</option>
    <option value="15">Iowa</option>
    <option value="16">Kansas</option>
    <option value="17">Kentucky</option>
    <option value="18">Louisiana</option>
    <option value="19">Maine</option>
    <option value="20">Maryland</option>
    <option value="21">Massachusetts</option>
    <option value="22">Michigan</option>
    <option value="23">Minnesota</option>
    <option value="24">Mississippi</option>
    <option value="25">Missouri</option>
    <option value="26">Montana</option>
    <option value="27">Nebraska</option>
    <option value="28">Nevada</option>
    <option value="29">New Hampshire</option>
    <option value="30">New Jersey</option>
    <option value="31">New Mexico</option>
    <option value="32">New York</option>
    <option value="33">North Carolina</option>
    <option value="34">North Dakota</option>
    <option value="35">Ohio</option>
    <option value="36">Oklahoma</option>
    <option value="37">Oregon</option>
    <option value="38">Pennsylvania</option>
    <option value="39">Rhode Island</option>
    <option value="40">South Carolina</option>
    <option value="41">South Dakota</option>
    <option value="42">Tennessee</option>
    <option value="43">Texas</option>
    <option value="44">Utah</option>
    <option value="45">Vermont</option>
    <option value="46">Virginia</option>
    <option value="47">Washington</option>
    <option value="48">West Virginia</option>
    <option value="49">Wisconsin</option>
    <option value="50">Wyoming</option>
</select></>);
};

export default OnboardingPage;