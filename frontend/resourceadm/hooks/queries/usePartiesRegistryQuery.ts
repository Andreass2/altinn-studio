import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useServicesContext } from 'app-shared/contexts/ServicesContext';
import { QueryKey } from 'app-shared/types/QueryKey';
import type {
  BrregPartySearchResult,
  BrregSearchResult,
  ResourceError,
} from 'app-shared/types/ResourceAdm';

export const usePartiesRegistryQuery = (searchUrl: string) => {
  const { getParties } = useServicesContext();

  return useQuery<BrregPartySearchResult, ResourceError, BrregSearchResult>({
    queryKey: [QueryKey.PartiesRegistrySearch, searchUrl],
    queryFn: () => getParties(searchUrl),
    select: (data): BrregSearchResult => {
      return {
        parties: (data._embedded?.enheter ?? []).map((party) => {
          return {
            orgNr: party.organisasjonsnummer,
            orgName: party.navn,
            isSubParty: false,
          };
        }),
        links: data._links,
        page: data.page,
      };
    },
    enabled: !!searchUrl,
    placeholderData: keepPreviousData,
  });
};
