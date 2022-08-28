import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useContext } from 'react';
import { useControl } from 'react-map-gl';
import { GlobalStates } from '../../GlobalStates';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const TOKEN = process.env.REACT_APP_MapboxAccessToken;

const GeocoderControl = () => {

    const {
        actions:{updateMapLocation},
    } = useContext(GlobalStates);

    const ctrl = new MapBoxGeocoder({
        accessToken:TOKEN,
        marker:false,
        
    })

    useControl(() => ctrl);

    ctrl.on('result', (e) => {
        const coords = e.result.geometry.coordinates;
        updateMapLocation({lng:coords[0], lat:coords[1]});
    })

    return (
        null
    )
}

export default GeocoderControl;