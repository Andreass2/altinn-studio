//Selectors in designer
export const designer = {
  appMenu: {
    about: "[data-testid='top_menu.about']",
    edit: "[data-testid='top_menu.create']",
    texts: "[data-testid='top_menu.texts']",
    deploy: "[data-testid='top_menu.deploy']",
    datamodel: "[data-testid='top_menu.datamodel']",
  },
  olderBuilds: 'Tidligere bygg av applikasjonen',
  inprogressSpinner: "[role='progressbar']",
  failedCheck: "i[class*='ai-circle-exclamation']",
  successCheck: "i[class*='ai-check-circle']",
  build: {
    versionNum: 'input[aria-label="Versjonsnummer"]',
    versionDesc: 'textarea',
  },
  deploy: {
    at22Versions: '#deploy-select-at22',
    prodVersions: '#deploy-select-production',
    versions: '.select__menu-list',
    latestBuild: '.select__option--is-focused',
    confirm: '#deployPopover',
    at22Deploy: '#deploy-button-at22',
    prodDeploy: '#deploy-button-production',
    inProgress: 'div[class*="MuiCircularProgress-indeterminate"][role="progressbar"]',
  },
  deployHistory: {
    at22: '#deploy-history-table-at22',
    prod: '#deploy-history-table-production',
  },
  aboutApp: {
    appName: '#administrationInputAppName_textField',
    appDescription: '#administrationInputDescription_textField',
    appHeader: "[data-testid='administration-container'] h1",
    repoName: '#administrationInputReponame',
  },
  syncApp: {
    pull: '#fetch_changes_btn',
    push: '#changes_to_share_btn',
    noChanges: '#no_changes_to_share_btn',
    pushButton: '#share_changes_modal_button',
    commitMessage: 'textarea[id="test"]',
    pushSuccess: '.fa.fa-circlecheck',
  },
  deleteChanges: {
    reset: '#reset-repo-button',
    name: '#delete-repo-name',
    confirm: '#confirm-reset-repo-button',
  },
  sideMenu: '#altinn-column-layout-side-menu',
  layOutContainer: '#altinn-column-layout-container',
  appEditorMenu: {
    datamodel: "[data-testid='leftMenu_datamodel']",
    uiEditor: "[data-testid='leftMenu_ui-editor']",
    accessControl: "a[data-testid='leftMenu_accesscontrol']",
  },
  dragToArea: "[data-testid='droppable-draggable-container']",
  draggable: "div[draggable='true']",
  formComponents: {
    shortAnswer: "i[class^='fa fa-short-answer']",
    longAnswer: "i[class^='fa fa-long-answer']",
    checkBox: "i[class^='fa fa-checkbox']",
    radioDutton: "i[class^='fa fa-radio-button']",
    dropDown: "i[class^='fa fa-drop-down']",
    attachment: "i[class^='fa fa-attachment']",
    date: "i[class^='fa fa-date']",
    formButton: "i[class^='fa fa-button']",
  },
  deleteComponent: '.fa-circletrash',
  rules: {
    add: 'button[aria-label="Legg til regel for beregninger"]',
    list: 'select[name="selectRule"]',
    paramA: '#a',
    paramValue: 'div[class$="indicatorContainer"]',
    dataModelBinding: 'div[class$="option"][id^="react-select"]',
  },
  dynamics: {
    add: 'button[aria-label="Legg til regel for vis/skjul felt"]',
    list: '#selectConditionalRule',
    action: '#select_action',
  },
  submit: 'button[type="submit"]',
  delete: '.a-btn-danger',
  clone: {
    copyRepo: '#copy-repository-url-button',
    missingDatamodel: 'Datamodell mangler',
    datamodelLink: 'a[href$="datamodel"]',
    docs: 'a[href="https://docs.altinn.studio/"]',
  },
  texts: {
    new: "[data-testid='text-editor-btn-add']",
    root: 'div[data-schemapath="root.resources"]',
    resources: 'tr[data-schemapath^="root.resources"]',
    resourceId: 'input[name$="[id]"]',
    resourceValue: 'input[name$="[value]"]',
    requiredError: '.help-block.errormsg',
    save: 'input[onclick="submitForm()"]',
    delete: '.json-editor-btn-delete',
  },
};
