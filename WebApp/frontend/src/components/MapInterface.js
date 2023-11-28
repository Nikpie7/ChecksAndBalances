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
import alaskaJSON from '../assets/geoJSON/alaskaJSON.json';
import hawaiiJSON from '../assets/geoJSON/hawaiiJSON.json';
import { GeoJSON as LeafletGeoJSON, LatLngBounds } from 'leaflet';
import * as L from 'leaflet';
import { getSenators } from '../utils/onboardingService.js';
import { useLocation, useNavigate } from 'react-router-dom';
import useMouse from '@react-hook/mouse-position';

const HoverTooltip = ({text, mouse}) => {
  return (<div style={{top: mouse.pageY - 40, left: mouse.pageX + 5}} className="fixed text-md z-[1000] bg-white opacity-100 p-1 rounded-lg">{text}</div>)
};
const TrackMouse = ({text}) => {
  const [mouse, setMouse] = useState({pageX: 0, pageY: 0});
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({ pageX: event.clientX, pageY: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => { window.removeEventListener('mousemove', handleMouseMove); };
  }, []);
  const divRef = useRef(null);
  return text !== '' ? <HoverTooltip text={text} mouse={mouse} /> : null;
};


const MapInterface = ({userData, setUserData}) => {
  const [map, setMap] = useState(null);
  const [tooltipText, setTooltipText] = useState('');
  const [tileLayerVisible, setTileLayerVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [flying, setFlying] = useState(false);
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
    setFlying(true);
    navigate('/district');
    return;
  }
  const onStateMouseOver = properties => {
    // console.log('Mouse Over');
    setTooltipText(properties.layer.feature.properties.NAME)
    setHoveredFeature(properties.layer.feature.properties);
  };
  const onMouseOut = () => {
    // console.log('Mouse Out');
    setHoveredFeature(null);
    setTooltipText('')
  };
  const onResize = properties => { map?.invalidateSize(); };

  const [mapState, setMapState] = useState({
    key: '/state',
    className: "h-[75vh]",
    geoJSON: stateJSON,
    markerLocation: null,
    geoJSONEventHandlers: {
      click: onStateClick,
      mouseover: onStateMouseOver,
      mouseout: onMouseOut
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
          key: path,
          className: "h-[75vh]",
          geoJSON: stateJSON,
          markerLocation: null,
          geoJSONEventHandlers: {
            click: onStateClick,
            mouseover: onStateMouseOver,
            mouseout: onMouseOut
          },
          mapEventHandlers: {zoomend: noop}
        };
        break;
      case '/district':
        const stateFP = stateJSON.features[userData.state].properties.STATEFP;
        const stateDistrictJSON = userData.state === 1 ? alaskaJSON
        : userData.state === 11 ? hawaiiJSON
        : {
          type: 'FeatureCollection',
          features: districtJSON.features.filter(feature => feature.properties.STATEFP === stateFP)
        };
        newMapState = {
          ...mapState,
          className: "h-[70vh]",
          key: path,
          geoJSON: stateDistrictJSON,
          markerLocation: null,
          geoJSONEventHandlers: {
            click: onDistrictClick,
            mouseover: onDistrictMouseOver,
            mouseout: onMouseOut
          },
          mapEventHandlers: {zoomend: () => { setFlying(false); setTileLayerVisible(false); }}
        };
        break;
      case '/interests':
        const selectedStateJSON = userData.state === 1 ? alaskaJSON
        : userData.state === 11 ? hawaiiJSON
        : {
          type: 'FeatureCollection',
          features: districtJSON.features.filter(feature => feature.properties.STATEFP === stateJSON.features[userData.state].properties.STATEFP)
        }; 
        const selectedDistrictJSON = selectedStateJSON.features.find(feature => feature.properties.STATEFP == stateIndexToFP(userData.state) && feature.properties.CD118FP == userData.district);
        newMapState = {
          ...mapState,
          key: path,
          markerLocation: userData.coords,
          geoJSON: selectedDistrictJSON,
          geoJSONEventHandlers: {},
          mapEventHandlers: {zoomend: () => { setFlying(false); setTileLayerVisible(true); }}
        };
        break;
      case '/createAccount':
        newMapState = {
          ...mapState,
          key: path,
          markerLocation: userData.coords,
          // geoJSON: districtJSON.features.find(feature => feature.properties.STATEFP == stateIndexToFP(userData.state) && feature.properties.CD118FP == userData.district),
          geoJSONEventHandlers: {},
          mapEventHandlers: {zoomend: () => { setFlying(false); setTileLayerVisible(true); }}
        };
        break;
    };
    setTooltipText('');
    setMapState(newMapState);
  }, [location.pathname])
  useEffect(() => {
    if (map) {
      map.invalidateSize();
      if (mapState.key !== '/district' || mapState.key !== '/createAccount')
        map.flyToBounds(L.geoJSON(mapState.geoJSON).getBounds());
      else
        map.flyToBounds(L.geoJSON(districtJSON.features.find(feature => feature.properties.STATEFP == stateIndexToFP(userData.state) && feature.properties.CD118FP == userData.district)).getBounds());
      map._renderer.options.padding = 10;
      map.on('zoomend', mapState.mapEventHandlers.zoomend);
    }
  }, [mapState]);

  const stateIndexToFP = stateIndex => stateJSON.features[stateIndex].properties.STATEFP;
  const nationBounds = L.latLngBounds([22, -134], [50, -64]);

  const onDistrictClick = properties => {
    setUserData({
      ...userData,
      district: properties.layer.feature.properties.CD118FP
    });
    setFlying(true);
    navigate('/interests');
    return;
  };
  const onDistrictMouseOver = properties => {
    // console.log(properties.layer.feature.properties);
    const districtNumber = +properties.layer.feature.properties.CD118FP;
    setTooltipText(districtNumber === 0 ? 'District at Large' : 'District ' + districtNumber);
    setHoveredFeature(properties.layer.feature.properties);
  };
  const styleGeoJSON = feature => {
    // console.log('Why thousands of these?');
    // console.log(feature);
    // return (mapState.key === '/state' && hoveredFeature.STATEFP === feature.STATEFP)
    const hoverStyle = {
      fillColor: "#3d40ff",
      fillOpacity: 0.7
    };
    const neutralStyle = {
      fillColor: "#3388ff",
      fillOpacity: 0.2
    };
    return (mapState.key === '/state' && hoveredFeature && hoveredFeature.STATEFP === feature.properties.STATEFP
      || mapState.key === '/district' && hoveredFeature && hoveredFeature.STATEFP === feature.properties.STATEFP && hoveredFeature.CD118FP === feature.properties.CD118FP)
      ? hoverStyle
      : neutralStyle;
  }

  return (<div className={`w-full ${mapState.className}`}>
    {/* <TooltipLayer text={tooltipText} className={mapState.className} /> */}
    {flying ? null : <TrackMouse text={tooltipText} /> }
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
      // zoomend={mapState.mapEventHandlers?.zoomend}
      zoomSnap={0.1} zoomControl={false} boxZoom={false} doubleClickZoom={false} dragging={false} scrollWheelZoom={false} touchZoom={false}
    >
      <GeoJSON
        data={mapState.geoJSON}
        key={mapState.key}
        eventHandlers={mapState.geoJSONEventHandlers}
        style={styleGeoJSON}
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