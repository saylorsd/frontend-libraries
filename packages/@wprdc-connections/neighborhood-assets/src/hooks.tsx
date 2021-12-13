import { useEffect, useState } from 'react';
import { Asset } from '@wprdc-types/neighborhood-assets';
import { ResponsePackage } from '@wprdc-types/api';
import * as AssetsAPI from './api';

export function useAssetDetails(assetID: number) {
  const [details, setDetails] = useState<Asset>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    function handleResponse({ data, error }: ResponsePackage<Asset>) {
      setDetails(data);
      setError(error);
    }

    AssetsAPI.getAssetById(assetID).then(handleResponse);
    return function cleanup() {};
  }, [assetID]);

  return { details, error };
}
