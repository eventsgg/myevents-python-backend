import React from 'react';
import GoogleMapReact from 'google-map-react';

export function Map() {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                defaultCenter={{ lat: 55.775241, lng: 37.746229 }}
                defaultZoom={12}
                onGoogleApiLoaded={({ map, maps }) => {
                    return new maps.Marker({
                        map: map,
                        position: new maps.LatLng(55.775241, 37.746229)
                    });
                }}
            />
        </div>
    );
};