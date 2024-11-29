import type { ChangeEvent, HTMLAttributes, ReactElement } from 'react';
import React, { forwardRef, useState } from 'react';
import type { TextResource } from '../../types/TextResource';
import { StudioTextResourcePicker } from '../StudioTextResourcePicker';
import { StudioCodeFragment } from '../StudioCodeFragment';
import { ToggleGroup } from '@digdir/designsystemet-react';
import { PencilIcon, MagnifyingGlassIcon } from '@studio/icons';
import classes from './StudioTextResourceInput.module.css';
import type { StudioTextfieldProps } from '../StudioTextfield';
import { StudioTextfield } from '../StudioTextfield';
import { changeTextResourceInList, editTextResourceValue, getTextResourceById } from './utils';
import { usePropState } from '@studio/hooks';
import type { TextResourceInputTexts } from './types/TextResourceInputTexts';
import cn from 'classnames';

export type StudioTextResourceInputProps = TextResourceInputPropsBase &
  HTMLAttributes<HTMLInputElement>;

type TextResourceInputPropsBase = {
  currentId: string;
  currentIdClass?: string;
  inputClass?: string;
  onChangeCurrentId: (id: string) => void;
  onChangeTextResource: (textResource: TextResource) => void;
  textResources: TextResource[];
  texts: TextResourceInputTexts;
  toggleClass?: string;
};

export const StudioTextResourceInput = forwardRef<HTMLInputElement, StudioTextResourceInputProps>(
  (
    {
      className: givenClass,
      currentId: givenCurrentId,
      currentIdClass,
      inputClass,
      onChangeTextResource,
      onChangeCurrentId,
      onKeyDown,
      textResources: givenTextResources,
      texts,
      toggleClass,
      ...rest
    },
    ref,
  ): ReactElement => {
    const [mode, setMode] = useState<Mode>(Mode.EditValue);
    const [currentId, setCurrentId] = usePropState<string>(givenCurrentId);
    const [textResources, setTextResources] = usePropState<TextResource[]>(givenTextResources);

    const handleChangeCurrentId = (id: string): void => {
      setCurrentId(id);
      onChangeCurrentId(id);
    };

    const handleTextResourceChange = (newTextResource: TextResource): void => {
      const newList = changeTextResourceInList(textResources, newTextResource);
      setTextResources(newList);
      onChangeTextResource(newTextResource);
    };

    const rootClass = cn(givenClass, classes.container);

    return (
      <div className={rootClass}>
        <InputBox
          currentId={currentId}
          inputClass={inputClass}
          mode={mode}
          onChangeCurrentId={handleChangeCurrentId}
          onChangeTextResource={handleTextResourceChange}
          onKeyDown={onKeyDown}
          ref={ref}
          textResources={textResources}
          texts={texts}
          {...rest}
        />
        <ModeToggle className={toggleClass} inputMode={mode} onToggle={setMode} texts={texts} />
        <CurrentId className={currentIdClass} currentId={currentId} label={texts.idLabel} />
      </div>
    );
  },
);

StudioTextResourceInput.displayName = 'StudioTextResourceInput';

enum Mode {
  EditValue = 'editValue',
  Search = 'search',
}

type InputBoxProps = StudioTextResourceInputProps & {
  mode: Mode;
};

const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
  (
    {
      currentId,
      inputClass,
      mode,
      onChangeCurrentId,
      onChangeTextResource,
      onKeyDown,
      textResources,
      texts,
      ...rest
    },
    ref,
  ): ReactElement => {
    const currentTextResource = getTextResourceById(textResources, currentId);
    const className = cn(inputClass, classes.inputbox);

    switch (mode) {
      case Mode.EditValue:
        return (
          <ValueField
            className={className}
            label={texts.valueLabel}
            onChangeTextResource={onChangeTextResource}
            onKeyDown={onKeyDown}
            ref={ref}
            textResource={currentTextResource}
            {...rest}
          />
        );
      case Mode.Search:
        return (
          <StudioTextResourcePicker
            className={className}
            emptyListText={texts.emptyResourceList}
            label={texts.textResourcePickerLabel}
            onValueChange={onChangeCurrentId}
            onKeyDown={onKeyDown}
            textResources={textResources}
            ref={ref}
            value={currentId}
            {...rest}
          />
        );
    }
  },
);

InputBox.displayName = 'InputBox';

type ValueFieldProps = StudioTextfieldProps & {
  textResource: TextResource;
  onChangeTextResource: (textResource: TextResource) => void;
};

const ValueField = forwardRef<HTMLInputElement, ValueFieldProps>(
  ({ textResource, onChange, onChangeTextResource, ...rest }, ref): ReactElement => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      const { value } = event.target;
      const newTextResource = editTextResourceValue(textResource, value);
      onChangeTextResource(newTextResource);
      onChange?.(event);
    };

    return (
      <StudioTextfield
        hideLabel
        onChange={handleChange}
        ref={ref}
        size='sm'
        value={textResource.value}
        {...rest}
      />
    );
  },
);

ValueField.displayName = 'ValueField';

type InputModeToggleProps = {
  className?: string;
  inputMode: Mode;
  onToggle: (mode: Mode) => void;
  texts: TextResourceInputTexts;
};

function ModeToggle({
  className: givenClass,
  inputMode,
  onToggle,
  texts,
}: InputModeToggleProps): ReactElement {
  const className = cn(givenClass, classes.toggle);
  return (
    <ToggleGroup onChange={onToggle} value={inputMode} size='sm' className={className}>
      <ToggleGroup.Item icon value={Mode.EditValue} title={texts.editValue}>
        <PencilIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item icon value={Mode.Search} title={texts.search}>
        <MagnifyingGlassIcon />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}

type CurrentIdProps = {
  className?: string;
  currentId: string;
  label: string;
};

function CurrentId({ className: givenClass, currentId, label }: CurrentIdProps): ReactElement {
  const className = cn(givenClass, classes.id);
  return (
    <div className={className}>
      {label}
      <StudioCodeFragment>{currentId}</StudioCodeFragment>
    </div>
  );
}
