import * as GeoAPI from './api';

import { useEffect, useState } from 'react';

import { Geog, GeogBrief } from '@wprdc-types/geo';
import { ResponsePackage } from '@wprdc-types/api';

export function useGeography(geogBrief?: GeogBrief) {
  const [geog, setGeog] = useState<Geog>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    function handleResponse({ data, error }: ResponsePackage<Geog>) {
      setGeog(data);
      setError(error);
      setIsLoading(false);
    }

    if (!!geogBrief) {
      setIsLoading(true);
      GeoAPI.requestGeogDetails(geogBrief).then(handleResponse);
    }

    return function cleanup() {};
  }, [geogBrief]);

  return { geog, isLoading, error };
}
