import { useEffect, useState } from 'react';
import { DataVizBase, Downloaded, ErrorRecord } from '@wprdc-types/viz';
import { ResponsePackage } from '@wprdc-types/api';

import { VizAPI } from './api';

export function useDataViz(dataVizSlug?: string, geogSlug?: string) {
  const [dataViz, setDataViz] = useState<Downloaded<DataVizBase>>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<ErrorRecord>();

  useEffect(() => {
    function handleResponse({
      data,
      error, // fetch error
    }: ResponsePackage<Downloaded<DataVizBase>>) {
      setDataViz(data);
      // if uncaught or other fetch error
      if (!!error) setError({ status: 'ERROR', level: 100, message: error });
      // for errors caught in backend and returned in response
      if (!!data && !!data.error && !!data.error.level) setError(data.error);
      // if no error, then clear saved error
      if (!!data && (!data.error || !data.error.level)) setError(undefined);
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
