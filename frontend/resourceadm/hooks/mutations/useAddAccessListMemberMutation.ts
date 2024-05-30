import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServicesContext } from 'app-shared/contexts/ServicesContext';
import { QueryKey } from 'app-shared/types/QueryKey';

/**
 * Mutation to add a member to a access list.
 *
 * @param org the organisation of the user
 * @param listIdentifier the identifier of the list to add the member to
 * @param env the list environment
 */
export const useAddAccessListMemberMutation = (
  org: string,
  listIdentifier: string,
  env: string,
) => {
  const queryClient = useQueryClient();
  const { addAccessListMember } = useServicesContext();

  return useMutation({
    mutationFn: (orgnrs: string[]) =>
      addAccessListMember(org, listIdentifier, env, { data: orgnrs }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.AccessListMembers, env, listIdentifier],
      });
    },
  });
};
