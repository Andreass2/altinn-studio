import type { TranslationKey } from 'language/type';
import { validateLayoutNameAndLayoutSetName } from 'app-shared/utils/LayoutAndLayoutSetNameValidationUtils/validateLayoutNameAndLayoutSetName';

/**
 * Checks if the new written page name already exists
 */
export const pageNameExists = (candidateName: string, layoutOrder: string[]): boolean =>
  layoutOrder.some((p: string) => p.toLowerCase() === candidateName.toLowerCase());

/**
 * Gets the page name error key if there is an error in a new suggested page name
 *
 * @param newNameCandidate the new suggested name
 * @param oldName the old name
 * @param layoutOrder the layout order
 *
 * @returns the key
 */
export const getPageNameErrorKey = (
  newNameCandidate: string,
  oldName: string,
  layoutOrder: string[],
): TranslationKey => {
  if (pageNameExists(newNameCandidate, layoutOrder) && oldName !== newNameCandidate) {
    return 'ux_editor.pages_error_unique';
  } else if (!newNameCandidate) {
    return 'ux_editor.pages_error_empty';
  } else if (!validateLayoutNameAndLayoutSetName(newNameCandidate)) {
    return 'validation_errors.name_invalid';
  } else {
    return null;
  }
};
