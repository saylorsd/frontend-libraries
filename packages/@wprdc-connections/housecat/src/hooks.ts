import { useEffect, useState } from 'react';

import { ErrorRecord } from '@wprdc-types/viz';
import { ResponsePackage } from '@wprdc-types/api';
import { ProjectIndex, ProjectIndexDetails } from '@wprdc-types/housecat';

import { HousecatAPI } from './api';

export function usePublicHousingProject(identifier: number | ProjectIndex) {
  const [affordableHousingProject, setAffordableHousingProject] =
    useState<ProjectIndexDetails>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<ErrorRecord>();

  useEffect(() => {
    function handleResponse({
      data,
      error,
    }: ResponsePackage<ProjectIndexDetails>) {
      setAffordableHousingProject(data);
      if (!!error) setError({ status: 'ERROR', level: 100, message: error });
      else setError(undefined);
      setIsLoading(false);
    }

    if (!!identifier) {
      const argID = typeof identifier === 'number' ? identifier : identifier.id;
      setIsLoading(true);
      HousecatAPI.requestAffordableHousingProject(argID).then(handleResponse);
    }

    return function cleanup() {};
  }, [identifier]);

  return { affordableHousingProject, error, isLoading };
}
