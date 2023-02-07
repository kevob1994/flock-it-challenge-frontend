import { FC, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

interface IMapProps {
  coordinates: { lat: number; lng: number };
  width?: string;
  height?: string;
}

export const Map: FC<IMapProps> = ({ coordinates, width = '100%', height = '400px' }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCy4emx9MI99esgm8kGthzfbpkVHYZM4Hw',
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width, height }}
      center={coordinates}
      zoom={7}
      onLoad={onLoad}
      onUnmount={onUnmount}
    ></GoogleMap>
  ) : (
    <></>
  );
};
