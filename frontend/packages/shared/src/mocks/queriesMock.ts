import type { ServicesContextProps } from 'app-shared/contexts/ServicesContext';
import type { Altinn2LinkService } from 'app-shared/types/Altinn2LinkService';
import type { AppConfig } from 'app-shared/types/AppConfig';
import type { AppVersion } from 'app-shared/types/AppVersion';
import type { ApplicationMetadata } from 'app-shared/types/ApplicationMetadata';
import type { BranchStatus } from 'app-shared/types/BranchStatus';
import type {
  DataModelMetadataJson,
  DataModelMetadataXsd,
} from 'app-shared/types/DataModelMetadata';
import type { Environment } from 'app-shared/types/Environment';
import type { JsonSchema } from 'app-shared/types/JsonSchema';
import type { Organization } from 'app-shared/types/Organization';
import type { OrgList } from 'app-shared/types/OrgList';
import type { RepoStatus } from 'app-shared/types/RepoStatus';
import type { Repository, User } from 'app-shared/types/Repository';
import type {
  AccessList,
  AccessListsResponse,
  BrregPartySearchResult,
  BrregSubPartySearchResult,
  Resource,
  ResourceListItem,
  ResourceVersionStatus,
  Validation,
} from 'app-shared/types/ResourceAdm';
import type { RuleConfig } from 'app-shared/types/RuleConfig';

import type {
  AppReleasesResponse,
  CreateRepoCommitPayload,
  DataModelMetadataResponse,
  FormLayoutsResponse,
  SearchRepositoryResponse,
} from 'app-shared/types/api';
import type { LayoutSets } from 'app-shared/types/api/LayoutSetsResponse';
import type {
  IFrontEndSettings,
  ILayoutSettings,
  ITextResourcesObjectFormat,
  ITextResourcesWithLanguage,
} from 'app-shared/types/global';
import type { WidgetSettingsResponse } from 'app-shared/types/widgetTypes';
import type { Policy, PolicyAction, PolicySubject } from 'packages/policy-editor';
import {
  appConfig,
  deploymentsResponse,
  appVersion,
  appReleasesResponse,
  applicationMetadata,
  branchStatus,
  createRepoCommitPayload,
  dataModelMetadataResponse,
  layoutSets,
  orgList,
  policy,
  repoStatus,
  repository,
  resource,
  resourceVersionStatus,
  ruleConfig,
  searchRepositoryResponse,
  textResourcesWithLanguage,
  user,
  validation,
  updateOptionListResponse,
} from './mocks';
import type { FormLayoutsResponseV3 } from 'app-shared/types/api/FormLayoutsResponseV3';
import type { DeploymentsResponse } from 'app-shared/types/api/DeploymentsResponse';
import type { RepoDiffResponse } from 'app-shared/types/api/RepoDiffResponse';
import type { ExternalImageUrlValidationResponse } from 'app-shared/types/api/ExternalImageUrlValidationResponse';
import type { OptionsLists } from 'app-shared/types/api/OptionsLists';
import type { Option } from 'app-shared/types/Option';

export const queriesMock: ServicesContextProps = {
  // Queries
  getAppMetadataModelIds: jest.fn().mockImplementation(() => Promise.resolve<string[]>([])),
  getAppReleases: jest
    .fn()
    .mockImplementation(() => Promise.resolve<AppReleasesResponse>(appReleasesResponse)),
  getAppVersion: jest.fn().mockImplementation(() => Promise.resolve<AppVersion>(appVersion)),
  getBranchStatus: jest.fn().mockImplementation(() => Promise.resolve<BranchStatus>(branchStatus)),
  getDataModel: jest.fn().mockImplementation(() => Promise.resolve<JsonSchema>({})),
  getDataModelMetadata: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve<DataModelMetadataResponse>(dataModelMetadataResponse),
    ),
  getDataModelsJson: jest
    .fn()
    .mockImplementation(() => Promise.resolve<DataModelMetadataJson[]>([])),
  getDataModelsXsd: jest.fn().mockImplementation(() => Promise.resolve<DataModelMetadataXsd[]>([])),
  getDeployPermissions: jest.fn().mockImplementation(() => Promise.resolve<string[]>([])),
  getDeployments: jest
    .fn()
    .mockImplementation(() => Promise.resolve<DeploymentsResponse>(deploymentsResponse)),
  getRepoDiff: jest.fn().mockImplementation(() => Promise.resolve<RepoDiffResponse>({})),
  getEnvironments: jest.fn().mockImplementation(() => Promise.resolve<Environment[]>([])),
  getFormLayoutSettings: jest.fn().mockImplementation(() => Promise.resolve<ILayoutSettings>({})),
  getFormLayouts: jest.fn().mockImplementation(() => Promise.resolve<FormLayoutsResponse>({})),
  getFormLayoutsV3: jest.fn().mockImplementation(() => Promise.resolve<FormLayoutsResponseV3>({})),
  getFrontEndSettings: jest.fn().mockImplementation(() => Promise.resolve<IFrontEndSettings>({})),
  getImageFileNames: jest.fn().mockImplementation(() => Promise.resolve<string[]>([])),
  getInstanceIdForPreview: jest.fn().mockImplementation(() => Promise.resolve<string>('')),
  getLayoutNames: jest.fn().mockImplementation(() => Promise.resolve<string[]>([])),
  getLayoutSets: jest.fn().mockImplementation(() => Promise.resolve<LayoutSets>(layoutSets)),
  getOptionListIds: jest.fn().mockImplementation(() => Promise.resolve<string[]>([])),
  getOptionLists: jest.fn().mockImplementation(() => Promise.resolve<OptionsLists>({})),
  getOrgList: jest.fn().mockImplementation(() => Promise.resolve<OrgList>(orgList)),
  getOrganizations: jest.fn().mockImplementation(() => Promise.resolve<Organization[]>([])),
  getRepoMetadata: jest.fn().mockImplementation(() => Promise.resolve<Repository>(repository)),
  getRepoPull: jest.fn().mockImplementation(() => Promise.resolve<RepoStatus>(repoStatus)),
  getRepoStatus: jest.fn().mockImplementation(() => Promise.resolve<RepoStatus>(repoStatus)),
  getRuleConfig: jest.fn().mockImplementation(() => Promise.resolve<RuleConfig>(ruleConfig)),
  getRuleModel: jest.fn().mockImplementation(() => Promise.resolve<string>('')),
  getStarredRepos: jest.fn().mockImplementation(() => Promise.resolve<Repository[]>([])),
  getTextLanguages: jest.fn().mockImplementation(() => Promise.resolve<string[]>([])),
  getTextResources: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve<ITextResourcesWithLanguage>(textResourcesWithLanguage),
    ),
  getUser: jest.fn().mockImplementation(() => Promise.resolve<User>(user)),
  getWidgetSettings: jest
    .fn()
    .mockImplementation(() => Promise.resolve<WidgetSettingsResponse | null>({})),
  searchRepos: jest
    .fn()
    .mockImplementation(() => Promise.resolve<SearchRepositoryResponse>(searchRepositoryResponse)),
  validateImageFromExternalUrl: jest
    .fn()
    .mockImplementation(() => Promise.resolve<ExternalImageUrlValidationResponse>('Ok')),

  // Queries - Settings modal
  getAppConfig: jest.fn().mockImplementation(() => Promise.resolve<AppConfig>(appConfig)),
  getAppPolicy: jest.fn().mockImplementation(() => Promise.resolve<Policy>(policy)),
  getAppMetadata: jest
    .fn()
    .mockImplementation(() => Promise.resolve<ApplicationMetadata>(applicationMetadata)),

  // Queries - Resourceadm
  getAltinn2LinkServices: jest
    .fn()
    .mockImplementation(() => Promise.resolve<Altinn2LinkService[]>([])),
  getPolicyActions: jest.fn().mockImplementation(() => Promise.resolve<PolicyAction[]>([])),
  getPolicy: jest.fn().mockImplementation(() => Promise.resolve<Policy>(policy)),
  getPolicySubjects: jest.fn().mockImplementation(() => Promise.resolve<PolicySubject[]>([])),
  getResource: jest.fn().mockImplementation(() => Promise.resolve<Resource>(resource)),
  getResourceList: jest.fn().mockImplementation(() => Promise.resolve<ResourceListItem[]>([])),
  getResourcePublishStatus: jest
    .fn()
    .mockImplementation(() => Promise.resolve<ResourceVersionStatus>(resourceVersionStatus)),
  getValidatePolicy: jest.fn().mockImplementation(() => Promise.resolve<Validation>(validation)),
  getValidateResource: jest.fn().mockImplementation(() => Promise.resolve<Validation>(validation)),
  getAccessLists: jest
    .fn()
    .mockImplementation(() => Promise.resolve<AccessListsResponse>({ data: [] })),
  getAccessList: jest.fn().mockImplementation(() => Promise.resolve<AccessList>(null)),
  getResourceAccessLists: jest
    .fn()
    .mockImplementation(() => Promise.resolve<AccessListsResponse>({ data: [] })),
  getParties: jest.fn().mockImplementation(() => Promise.resolve<BrregPartySearchResult>(null)),
  getSubParties: jest
    .fn()
    .mockImplementation(() => Promise.resolve<BrregSubPartySearchResult>(null)),
  getAccessListMembers: jest.fn().mockImplementation(() => Promise.resolve({ data: [] })),
  getAltinn2DelegationsCount: jest.fn().mockImplementation(() => Promise.resolve({})),

  // Queries - PrgetBpmnFile
  getBpmnFile: jest.fn().mockImplementation(() => Promise.resolve<string>('')),
  getProcessTaskType: jest.fn().mockImplementation(() => Promise.resolve<string>('')),
  getIsLoggedInWithAnsattporten: jest
    .fn()
    .mockImplementation(() => Promise.resolve<boolean>(false)),

  // Mutations
  addAppAttachmentMetadata: jest.fn().mockImplementation(() => Promise.resolve()),
  addDataTypeToAppMetadata: jest.fn().mockImplementation(() => Promise.resolve()),
  addImage: jest.fn().mockImplementation(() => Promise.resolve()),
  addLayoutSet: jest.fn().mockImplementation(() => Promise.resolve()),
  addLanguageCode: jest.fn().mockImplementation(() => Promise.resolve()),
  addRepo: jest.fn().mockImplementation(() => Promise.resolve<Repository>(repository)),
  addXsdFromRepo: jest.fn().mockImplementation(() => Promise.resolve<JsonSchema>({})),
  commitAndPushChanges: jest
    .fn()
    .mockImplementation(() => Promise.resolve<CreateRepoCommitPayload>(createRepoCommitPayload)),
  copyApp: jest.fn().mockImplementation(() => Promise.resolve()),
  createDataModel: jest.fn().mockImplementation(() => Promise.resolve<JsonSchema>({})),
  createDeployment: jest.fn().mockImplementation(() => Promise.resolve()),
  createRelease: jest.fn().mockImplementation(() => Promise.resolve()),
  createRepoCommit: jest
    .fn()
    .mockImplementation(() => Promise.resolve<CreateRepoCommitPayload>(createRepoCommitPayload)),
  deleteAppAttachmentMetadata: jest.fn().mockImplementation(() => Promise.resolve()),
  deleteDataModel: jest.fn().mockImplementation(() => Promise.resolve()),
  deleteDataTypeFromAppMetadata: jest.fn().mockImplementation(() => Promise.resolve()),
  deleteFormLayout: jest.fn().mockImplementation(() => Promise.resolve()),
  deleteImage: jest.fn().mockImplementation(() => Promise.resolve()),
  deleteLanguageCode: jest.fn().mockImplementation(() => Promise.resolve()),
  deleteLayoutSet: jest.fn().mockImplementation(() => Promise.resolve()),
  generateModels: jest.fn().mockImplementation(() => Promise.resolve()),
  logout: jest.fn().mockImplementation(() => Promise.resolve()),
  pushRepoChanges: jest.fn().mockImplementation(() => Promise.resolve()),
  resetRepoChanges: jest.fn().mockImplementation(() => Promise.resolve()),
  saveDataModel: jest.fn().mockImplementation(() => Promise.resolve()),
  saveFormLayout: jest.fn().mockImplementation(() => Promise.resolve()),
  saveFormLayoutV3: jest.fn().mockImplementation(() => Promise.resolve()),
  saveFormLayoutSettings: jest.fn().mockImplementation(() => Promise.resolve<ILayoutSettings>({})),
  saveRuleConfig: jest.fn().mockImplementation(() => Promise.resolve<RuleConfig>(ruleConfig)),
  setStarredRepo: jest.fn().mockImplementation(() => Promise.resolve()),
  unsetStarredRepo: jest.fn().mockImplementation(() => Promise.resolve()),
  updateAppAttachmentMetadata: jest.fn().mockImplementation(() => Promise.resolve()),
  updateFormLayoutName: jest.fn().mockImplementation(() => Promise.resolve()),
  updateLayoutSetId: jest.fn().mockImplementation(() => Promise.resolve()),
  updateTextId: jest.fn().mockImplementation(() => Promise.resolve()),
  updateTranslationByLangCode: jest.fn().mockImplementation(() => Promise.resolve()),
  updateAppPolicy: jest.fn().mockImplementation(() => Promise.resolve()),
  updateAppMetadata: jest.fn().mockImplementation(() => Promise.resolve()),
  updateAppConfig: jest.fn().mockImplementation(() => Promise.resolve()),
  updateOptionList: jest
    .fn()
    .mockImplementation(() => Promise.resolve<Option[]>(updateOptionListResponse)),
  uploadDataModel: jest.fn().mockImplementation(() => Promise.resolve<JsonSchema>({})),
  uploadOptionList: jest.fn().mockImplementation(() => Promise.resolve()),
  upsertTextResources: jest
    .fn()
    .mockImplementation(() => Promise.resolve<ITextResourcesObjectFormat>({})),

  // Mutations - Resourceadm
  createResource: jest.fn().mockImplementation(() => Promise.resolve()),
  importResourceFromAltinn2: jest.fn().mockImplementation(() => Promise.resolve<Resource>(null)),
  importResourceFromAltinn3: jest.fn().mockImplementation(() => Promise.resolve({})),
  publishResource: jest.fn().mockImplementation(() => Promise.resolve()),
  updatePolicy: jest.fn().mockImplementation(() => Promise.resolve()),
  updateResource: jest.fn().mockImplementation(() => Promise.resolve()),
  createAccessList: jest.fn().mockImplementation(() => Promise.resolve()),
  updateAccessList: jest.fn().mockImplementation(() => Promise.resolve()),
  deleteAccessList: jest.fn().mockImplementation(() => Promise.resolve()),
  addAccessListMember: jest.fn().mockImplementation(() => Promise.resolve()),
  removeAccessListMember: jest.fn().mockImplementation(() => Promise.resolve()),
  addResourceAccessList: jest.fn().mockImplementation(() => Promise.resolve()),
  removeResourceAccessList: jest.fn().mockImplementation(() => Promise.resolve()),
  migrateDelegations: jest.fn().mockImplementation(() => Promise.resolve()),

  // Mutations - ProcessEditor
  updateBpmnXml: jest.fn().mockImplementation(() => Promise.resolve()),
  updateProcessDataTypes: jest.fn().mockImplementation(() => Promise.resolve()),
};
