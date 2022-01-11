import { useEffect, useState } from 'react';
import { Indicator } from '@wprdc-types/profiles';
import { ResponsePackage } from '@wprdc-types/api';
import { ProfilesAPI } from './api';

/**
 * Hook that handles retrieving indicator details.
 */
export function useIndicator(indicatorSlug?: string) {
  const [indicator, setIndicator] = useState<Indicator>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    function handleResponse({ data, error }: ResponsePackage<Indicator>) {
      setIndicator(data);
      setError(error);
      setIsLoading(false);
    }

    if (!!indicatorSlug) {
      setIsLoading(true);
      ProfilesAPI.requestIndicator(indicatorSlug).then(handleResponse);
    }

    return function cleanup() {};
  }, [indicatorSlug]);

  return { indicator, isLoading, error };
}
