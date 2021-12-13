import * as GeoAPI from './api';

import { useEffect, useState } from 'react';

import { Geog, GeographyType } from '@wprdc-types/geo';
import { ResponsePackage } from '@wprdc-types/api';

export function useGeography(geogType?: GeographyType, geogID?: string) {
  const [geog, setGeog] = useState<Geog>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    function handleResponse({ data, error }: ResponsePackage<Geog>) {
      setGeog(data);
      setError(error);
      setIsLoading(false);
    }

    if (!!geogType && geogID) {
      setIsLoading(true);
      GeoAPI.requestGeogDetails({ geogID, geogType }).then(handleResponse);
    }

    return function cleanup() {};
  }, [geogID, geogType]);

  return { geog, isLoading, error };
}
