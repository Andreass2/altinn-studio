import React from 'react';
import classes from './FilePath.module.css';
import cn from 'classnames';
import { convertPureGitDiffToUserFriendlyDiff } from './FilePathUtils';
import { ChevronRightIcon } from '@studio/icons';
import { useTranslation } from 'react-i18next';
import { extractFilename, removeFileNameFromPath } from 'app-shared/utils/filenameUtils';
import type { QueryStatus } from '@tanstack/react-query';

export interface FilePathProps {
  filePath: string;
  diff: string;
  repoDiffStatus: QueryStatus;
}

export const FilePath = ({ filePath, diff, repoDiffStatus }: FilePathProps) => {
  const { t } = useTranslation();

  if (repoDiffStatus !== 'success') {
    return <FilePathWithoutDiff filePath={filePath} />;
  }

  const fileName = extractFilename(filePath);
  const linesToRender = convertPureGitDiffToUserFriendlyDiff(diff);

  return (
    <details
      className={classes.details}
      title={t('sync_header.show_changes_modal.file_diff_title', { fileName })}
    >
      <summary className={classes.filePathWithDiffContainer} title={filePath}>
        <ChevronRightIcon className={classes.chevronIcon} />
        <FormattedFilePath filePath={filePath} />
      </summary>
      <div className={classes.gitDiffViewer}>
        {linesToRender.map((line, index) => (
          <DiffLine key={index} line={line} />
        ))}
      </div>
    </details>
  );
};

type FilePathWithoutDiffProps = {
  filePath: string;
};

const FilePathWithoutDiff = ({ filePath }: FilePathWithoutDiffProps) => (
  <div className={classes.filePathContainer} title={filePath}>
    <FormattedFilePath filePath={filePath} />
  </div>
);

type FormattedFilePathProps = {
  filePath: string;
};

const FormattedFilePath = ({ filePath }: FormattedFilePathProps) => {
  const fileName = extractFilename(filePath);
  const filePathWithoutName = removeFileNameFromPath(filePath, true);

  return (
    <>
      <div className={classes.filePath}>{filePathWithoutName}</div>
      {'/'}
      <strong>{fileName}</strong>
    </>
  );
};

type DiffLineProps = {
  line: string;
};

const DiffLine = ({ line }: DiffLineProps) => (
  <div
    className={cn(
      classes.diffLine,
      isRemoved(line) && classes.removedLine,
      isAdded(line) && classes.addedLine,
    )}
  >
    {line}
  </div>
);

const isAdded = (line: string): boolean => line.startsWith('+');
const isRemoved = (line: string): boolean => line.startsWith('-');
