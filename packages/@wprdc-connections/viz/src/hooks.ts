import { useEffect, useState } from 'react';
import { DataVizBase, Downloaded } from '@wprdc-types/viz';
import { ResponsePackage } from '@wprdc-types/api';

import { VizAPI } from './api';

export function useDataViz(dataVizSlug?: string, geogSlug?: string) {
  const [dataViz, setDataViz] = useState<Downloaded<DataVizBase>>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    function handleResponse({
      data,
      error,
    }: ResponsePackage<Downloaded<DataVizBase>>) {
      console.log(data);
      setDataViz(data);
      setError(error);
      setIsLoading(false);
    }

    if (!!dataVizSlug && !!geogSlug) {
      setIsLoading(true);
      VizAPI.requestDataViz(dataVizSlug, geogSlug).then(handleResponse);
    }

    return function cleanup() {};
  }, [dataVizSlug, geogSlug]);

  return { dataViz, error, isLoading };
}
