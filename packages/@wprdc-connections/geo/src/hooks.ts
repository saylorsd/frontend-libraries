import * as GeoAPI from './api';

import { useEffect, useState } from 'react';

import { Geog, GeogIdentifier } from '@wprdc-types/geo';
import { ResponsePackage } from '@wprdc-types/api';

export function useGeography(geogID?: GeogIdentifier) {
  const [geog, setGeog] = useState<Geog>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    function handleResponse({ data, error }: ResponsePackage<Geog>) {
      setGeog(data);
      setError(error);
      setIsLoading(false);
    }

    if (!!geogID) {
      setIsLoading(true);
      GeoAPI.requestGeogDetails(geogID).then(handleResponse);
    }

    return function cleanup() {};
  }, [geogID]);

  return { geog, isLoading, error };
}
