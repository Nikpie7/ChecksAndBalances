import {
  react
} from 'react';
import {
  useState,
  useEffect,
  useRef
} from 'react';
import { MapContainer, Marker, GeoJSON, Pane, Popup, TileLayer, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import stateJSON from '../assets/geoJSON/cb_2022_us_state_5m.json';
import districtJSON from '../assets/geoJSON/cb_2022_us_cd118_5m.json';
// import { GeoJSON as LeafletGeoJSON, LatLngBounds } from 'leaflet';
import * as L from 'leaflet';
import { getSenators } from '../utils/onboardingService.js';
import { useNavigate } from 'react-router-dom';

const MapInterface = ({userData, setUserData}) => {
  const [map, setMap] = useState(null);
  const navigate = useNavigate();

  const [mapState, setMapState] = useState({});

  useEffect(() => {
    let newMapState = {};
    if (userData.state === null) {
      map?.invalidateSize();
      newMapState = {
        ...mapState,
        key: 'nation',
        className: "h-[75vh]",
        geoJSON: stateJSON,
        markerLocation: null,
        tileLayerVisible: false,
        eventHandlers: {
          click: onStateClick,
          mouseover: onStateMouseOver
        }
      };
    }
    else if (!userData.district) {
      console.log('District selection');
      const stateFP = stateJSON.features[userData.state].properties.STATEFP;
      const stateDistrictJSON = {
        type: 'FeatureCollection',
        features: districtJSON.features.filter(feature => feature.properties.STATEFP === stateFP)
      }
      newMapState = {
        ...mapState,
        className: "h-[70vh]",
        key: 'state',
        geoJSON: stateDistrictJSON,
        markerLocation: null,
        tileLayerVisible: false,
        eventHandlers: {
          click: onDistrictClick,
          mouseover: onDistrictMouseOver
        }
      };
    }
    else if (!userData.email) {
      console.log('Interest selection');
      setTimeout(() => {
        setMapState({
          ...mapState,
          geoJSON: districtJSON.features.find(feature => feature.properties.STATEFP == stateIndexToFP(userData.state) && feature.properties.CD118FP == userData.district),
          tileLayerVisible: true
        });
      }, 1900);
      newMapState = {
        ...mapState,
        key: 'district',
        markerLocation: userData.coords,
        eventHandlers: {}
      };
    }
    setMapState(newMapState);
  }, [userData])
  useEffect(() => {
    if (map) {
      if (mapState.key !== 'district')
        map.flyToBounds(L.geoJSON(mapState.geoJSON).getBounds());
      else
        map.flyToBounds(L.geoJSON(districtJSON.features.find(feature => feature.properties.STATEFP == stateIndexToFP(userData.state) && feature.properties.CD118FP == userData.district)).getBounds());
      map.invalidateSize();
      map._renderer.options.padding = 10;
    }
  }, [mapState])

  const stateIndexToFP = stateIndex => stateJSON.features[stateIndex].properties.STATEFP;
  const nationBounds = L.latLngBounds([22, -134], [50, -64]);
  // const geoJsonStyle = {

  // };

  const onStateClick = properties => {
    const state = properties.layer.feature.properties.NAME;
    const stateId = stateJSON.features.findIndex(feature => feature.properties.NAME === state);
    setUserData({
      ...userData,
      state: stateId
    });
    navigate('/district');
    return;
  }
  const onStateMouseOver = properties => {
    const state = properties.layer.feature.properties.NAME;
    return;
  };
  const onDistrictClick = properties => {
    setUserData({
      ...userData,
      district: properties.layer.feature.properties.CD118FP
    });
    navigate('/interests');
    return;
  };
  const onDistrictMouseOver = properties => {
    console.log(properties.layer.feature.properties.CD118FP);
  };

  return (<div className={`w-full ${mapState.className}`}>
    <MapContainer
      className="w-full h-full"
      whenReady={mapRef => {
        setMap(mapRef.target);
      }}
      center={[40, -98]}
      zoom={5}
      style={{
        backgroundColor: "white"
      }}
      zoomSnap={0.1} zoomControl={false} boxZoom={false} doubleClickZoom={false} dragging={false} scrollWheelZoom={false} touchZoom={false}
    >
      <GeoJSON
        data={mapState.geoJSON}
        key={mapState.key}
        eventHandlers={mapState.eventHandlers}
      >
        {/* <Marker position={[28, -81]} /> */}
        {mapState.markerLocation ? <Marker position={mapState.markerLocation} /> : null}
      </GeoJSON>
      {mapState.tileLayerVisible
        ? <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> : null }
    </MapContainer>
  </div>);
};

const DeprecatedMapInterface = ({mapState, setMapState}) => {
  const [selectedState, setSelectedState] = useState(0);
  const [map, setMap] = useState(null);
  const [reps, setReps] = useState({
    senators: [],
    representative: null
  })

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
    const stateName = stateJSON.features[selectedState].properties.STUSPS;
    // getSenators(stateName).then((officials) => {
    //   setReps({
    //     ...reps,
    //     senators: officials
    //   });
    // });
  }, [selectedState]);

  const onMapReady = (L) => {
    setMap(L.target);
  }
  const onStateClick = (properties) => {
    const state = properties.layer.feature.properties.NAME;
  };
  const onStateMouseOver = (properties) => {
    const state = properties.layer.feature.properties.NAME;
  };
  const jsonStyle = () => {
    return {
      fill: false,
      weight: 1
    };
  };
  return (
    <div className="w-[100vw] h-[72vh]">
      <main className="h-full">
        <MapContainer center={[40.052417, -98.595775]} zoom={4.2} scrollWheelZoom={false} className="h-full" style={{ backgroundColor: "white" }} whenReady={onMapReady} >
          <GeoJSON data={stateJSON} eventHandlers={{ click: onStateClick, mouseover: onStateMouseOver }} style={jsonStyle}>
            <Tooltip permanent={true} direction="center" position={[40.633931, -70.667909]}>Rhode Island</Tooltip>
          </GeoJSON>
        </MapContainer>
      </main>
    </div>
  );

};
export default MapInterface;