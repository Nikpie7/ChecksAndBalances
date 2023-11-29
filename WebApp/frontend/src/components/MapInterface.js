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
import { GeoJSON as LeafletGeoJSON, LatLngBounds } from 'leaflet';
import * as L from 'leaflet';
import { getSenators } from '../utils/onboardingService.js';
import { useLocation, useNavigate } from 'react-router-dom';

const MapInterface = ({userData, setUserData}) => {
  const [map, setMap] = useState(null);
  const [tileLayerVisible, setTileLayerVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const noop = () => {};

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
  const onResize = properties => { console.log(properties.type); map?.invalidateSize(); };

  const [mapState, setMapState] = useState({
    key: 'nation',
    className: "h-[75vh]",
    geoJSON: stateJSON,
    markerLocation: null,
    geoJSONEventHandlers: {
      click: onStateClick,
      mouseover: onStateMouseOver,
    },
    mapEventHandlers: { resize: onResize }
  });

  useEffect(() => {
    let newMapState = {};
    const path = location.pathname;
    switch (path) {
      case '/state':
        map?.invalidateSize();
        newMapState = {
          ...mapState,
          key: 'nation',
          className: "h-[75vh]",
          geoJSON: stateJSON,
          markerLocation: null,
          geoJSONEventHandlers: {
            click: onStateClick,
            mouseover: onStateMouseOver,
          },
          mapEventHandlers: {zoomend: noop}
        };
        break;
      case '/district':
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
          geoJSONEventHandlers: {
            click: onDistrictClick,
            mouseover: onDistrictMouseOver
          },
          mapEventHandlers: {zoomend: () => setTileLayerVisible(false) }
        };
        break;
      case '/interests':
        newMapState = {
          ...mapState,
          key: 'district',
          markerLocation: userData.coords,
          geoJSON: districtJSON.features.find(feature => feature.properties.STATEFP == stateIndexToFP(userData.state) && feature.properties.CD118FP == userData.district),
          geoJSONEventHandlers: {},
          mapEventHandlers: {zoomend: () => setTileLayerVisible(true) }
        };
        break;
    };
    setMapState(newMapState);
  }, [location.pathname])
  useEffect(() => {
    if (map) {
      if (mapState.key !== 'district')
        map.flyToBounds(L.geoJSON(mapState.geoJSON).getBounds());
      else
        map.flyToBounds(L.geoJSON(districtJSON.features.find(feature => feature.properties.STATEFP == stateIndexToFP(userData.state) && feature.properties.CD118FP == userData.district)).getBounds());
      map._renderer.options.padding = 10;
      map.invalidateSize();
      map.on('zoomend', mapState.mapEventHandlers.zoomend);
    }
  }, [mapState])
  // useEffect(() => {
  //   console.log(map._size);
  //   map?.invalidateSize();
  // }, [map?._size?.x]);
  console.log(map);

  const stateIndexToFP = stateIndex => stateJSON.features[stateIndex].properties.STATEFP;
  const nationBounds = L.latLngBounds([22, -134], [50, -64]);

  const onDistrictClick = properties => {
    setUserData({
      ...userData,
      district: properties.layer.feature.properties.CD118FP
    });
    navigate('/interests');
    return;
  };
  const onDistrictMouseOver = properties => {
    // console.log(properties.layer.feature.properties.CD118FP);
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
      zoomend={mapState.mapEventHandlers?.zoomend}
      zoomSnap={0.1} zoomControl={false} boxZoom={false} doubleClickZoom={false} dragging={false} scrollWheelZoom={false} touchZoom={false}
    >
      <GeoJSON
        data={mapState.geoJSON}
        key={mapState.key}
        eventHandlers={mapState.geoJSONEventHandlers}
      >
        {mapState.markerLocation ? <Marker position={mapState.markerLocation} /> : null}
      </GeoJSON>
      {tileLayerVisible
        ? <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> : null }
    </MapContainer>
  </div>);
};

export default MapInterface;