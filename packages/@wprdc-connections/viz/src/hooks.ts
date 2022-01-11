import { useEffect, useState } from 'react';
import { GeogBrief } from '@wprdc-types/geo';
import { DataVizBase, Downloaded } from '@wprdc-types/viz';
import { ResponsePackage } from '@wprdc-types/api';

import { VizAPI } from './api';

export function useDataViz(dataVizSlug?: string, geog?: GeogBrief) {
  const [dataViz, setDataViz] = useState<Downloaded<DataVizBase>>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    function handleResponse({
      data,
      error,
    }: ResponsePackage<Downloaded<DataVizBase>>) {
      setDataViz(data);
      setError(error);
      setIsLoading(false);
    }

    if (!!dataVizSlug && !!geog?.geogID) {
      setIsLoading(true);
      VizAPI.requestDataViz(dataVizSlug, geog).then(handleResponse);
    }

    return function cleanup() {};
  }, [dataVizSlug, geog]);

  return { dataViz, error, isLoading };
}
