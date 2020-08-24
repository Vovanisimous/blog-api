import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { IUser } from "../entity/user";

interface IProps {
    user?: IUser;
}

const containerStyle = {
    width: '400px',
    height: '400px'
};



export const Map = (props: IProps) => {
    const [map, setMap] = React.useState(null)
    const center = {
        lat: Number(props.user?.address.geo.lat),
        lng: Number(props.user?.address.geo.lng)
    };

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

        return (
            <LoadScript
                googleMapsApiKey = "AIzaSyDE5_vZ-qMw9G6k8-9Eu4pDYo-niNlMZQQ"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    <></>
                </GoogleMap>
            </LoadScript>
        )
}
