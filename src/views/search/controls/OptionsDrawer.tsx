import { useEffect, useState } from "react";
import { BiSlider } from "react-icons/bi";
import {
  VuiButtonPrimary,
  VuiButtonTertiary,
  VuiCheckbox,
  VuiDrawer,
  VuiFlexContainer,
  VuiFlexItem,
  VuiFormGroup,
  VuiHorizontalRule,
  VuiIcon,
  VuiRadioButton,
  VuiSpacer,
  VuiTitle,
} from "../../../ui";
import { useConfigContext } from "../../../contexts/ConfigurationContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const OptionsDrawer = ({ isOpen, onClose }: Props) => {
  const { uxMode, setUxMode } = useConfigContext();

  const [isCurrentChecked, setIsCurrentChecked] = useState(localStorage.getItem('is_current') === "true" ? true : localStorage.getItem('is_current') === "false" ? true : false);
  const [currentValue, setCurrentValue] = useState(localStorage.getItem('is_current') === "true" ? true : false);
  const [isPublicChecked, setIsPublicChecked] = useState(localStorage.getItem('is_public') === "true" ? true : localStorage.getItem('is_public') === "false" ? true : false);
  const [publicValue, setPublicValue] = useState(localStorage.getItem('is_public') === "true" ? true : false);
  const [isRemandChecked, setIsRemandChecked] = useState(localStorage.getItem('is_remand') === "true" ? true : localStorage.getItem('is_remand') === "false" ? true : false);
  const [remandValue, setRemandValue] = useState(localStorage.getItem('is_remand') === "true" ? true : false);
  // const [isSourceChecked, setIsSourceChecked] = useState(localStorage.getItem('source') ? true : false);
  // const [source, setSource] = useState(localStorage.getItem('source') ?? "");

  const [newUxMode, setNewUxMode] = useState(uxMode);

  useEffect(() => {
      if (isCurrentChecked === true) {
        localStorage.setItem('is_current', JSON.stringify(currentValue));
      } else if (isCurrentChecked === false) {
        localStorage.removeItem('is_current');
      } else {
        localStorage.setItem('is_current', JSON.stringify(currentValue));
      } 
    
  }, [isCurrentChecked, currentValue]);

  useEffect(() => {
    if (isPublicChecked === true) {
      localStorage.setItem('is_public', JSON.stringify(publicValue));
    } else if (isPublicChecked === false) {
      localStorage.removeItem('is_public');
    } else {
      localStorage.setItem('is_public', JSON.stringify(publicValue));
    }
  }, [isPublicChecked, publicValue]);

  useEffect(() => {
    if (isRemandChecked === true) {
      localStorage.setItem('is_remand', JSON.stringify(remandValue));
    } else if (isRemandChecked === false) {
      localStorage.removeItem('is_remand');
    } else {
      localStorage.setItem('is_remand', JSON.stringify(remandValue));
    }
  }, [isRemandChecked, remandValue]);

  // useEffect(() => {
  //   if (isSourceChecked === true && source) {
  //     localStorage.setItem('source', source);
  //   } else if (isSourceChecked === false) {
  //     localStorage.removeItem('source');
  //   } 
  // }, [isSourceChecked, source]);

  const handleCurrentValue = () => {
    setCurrentValue(!currentValue);
  }

  const handlePublicValue = () => {
    setPublicValue(!publicValue);
  }

  const handleRemandValue = () => {
    setRemandValue(!remandValue);
  }

  return (
    <VuiDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <VuiFlexContainer
          justifyContent="spaceBetween"
          alignItems="center"
          spacing="xs"
        >
          <VuiFlexItem>
            <VuiIcon size="s">
              <BiSlider />
            </VuiIcon>
          </VuiFlexItem>

          <VuiFlexItem>
            <VuiTitle size="s">
              <h2>Options</h2>
            </VuiTitle>
          </VuiFlexItem>
        </VuiFlexContainer>
      }
    >

      <VuiSpacer size="m" />

      <VuiFormGroup
        label="UX mode"
        labelFor="uxModeSelect"
        helpText="Focus the user experience on the search results or the summary."
      >
        <>
          <VuiRadioButton
            groupName="uxMode"
            label="Summary"
            onChange={() => setNewUxMode("summary")}
            checked={newUxMode === "summary"}
          />

          <VuiSpacer size="xs" />

          <VuiRadioButton
            groupName="uxMode"
            label="Search"
            onChange={() => setNewUxMode("search")}
            checked={newUxMode === "search"}
          />
        </>
      </VuiFormGroup>

      <VuiSpacer size="l" />

      <VuiHorizontalRule />

      <VuiFormGroup labelFor={"is_current"} label="is_current">
        <>
              <VuiCheckbox
                label="is_current"
                checked={isCurrentChecked}
                onChange={() => setIsCurrentChecked(() => {
                  return !isCurrentChecked
                })}
              />
              <VuiRadioButton
              disabled={!isCurrentChecked}
                groupName="is_current"
                label="True"
                checked={currentValue}
                onChange={handleCurrentValue}
              />
              <VuiRadioButton
              disabled={!isCurrentChecked}
                groupName="is_current"
                label="False"
                checked={!currentValue}
                onChange={handleCurrentValue}
              />
        </>
      </VuiFormGroup>
      
      <VuiSpacer size="l" />
      <VuiHorizontalRule />

      <VuiFormGroup labelFor={"is_public"} label={"is_public"}>
        <>
          <VuiCheckbox
            label="is_public"
            checked={isPublicChecked}
            onChange={() => setIsPublicChecked(!isPublicChecked)}
          />

          <VuiRadioButton
            disabled={!isPublicChecked}
            groupName="is_public"
            label="True"
            checked={publicValue}
            onChange={handlePublicValue}
          />

          <VuiRadioButton
            disabled={!isPublicChecked}
            groupName="is_public"
            label="False"
            checked={!publicValue}
            onChange={handlePublicValue}
          />
        </>
      </VuiFormGroup>
      <VuiSpacer size="l" />
      <VuiHorizontalRule />

      <VuiFormGroup labelFor={"is_remand"} label={"is_remand"}>
        <>
          <VuiCheckbox
            label="is_remand"
            checked={isRemandChecked}
            onChange={() => setIsRemandChecked(!isRemandChecked)}
          />

          <VuiRadioButton
            disabled={!isRemandChecked}
            groupName="is_remand"
            label="True"
            checked={remandValue}
            onChange={handleRemandValue}
          />

          <VuiRadioButton
            disabled={!isRemandChecked}
            groupName="is_remand"
            label="False"
            checked={!remandValue}
            onChange={handleRemandValue}
          />
        </>
      </VuiFormGroup>
      <VuiSpacer size="l" />
      <VuiHorizontalRule />


      {/* <VuiFormGroup labelFor={"source"} label={"source"}>
        <>
        <VuiCheckbox
            label="source"
            checked={isSourceChecked}
            onChange={() => setIsSourceChecked(!isSourceChecked)}
          />
          <input
            id="sourceInput"
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            disabled={!isSourceChecked}
          />
        </>
      </VuiFormGroup>
       */}
      <VuiSpacer size="m" />

      <VuiFlexContainer justifyContent="spaceBetween" alignItems="center">
        <VuiFlexItem grow={false} shrink={false}>
          <VuiButtonTertiary color="primary" onClick={() => onClose()}>
            Cancel
          </VuiButtonTertiary>
        </VuiFlexItem>

        <VuiFlexItem grow={false} shrink={false}>
          <VuiButtonPrimary
            color="primary"
            onClick={() => {
              setUxMode(newUxMode);
              onClose();
            }}
          >
            Save
          </VuiButtonPrimary>
        </VuiFlexItem>
      </VuiFlexContainer>
    </VuiDrawer>
  );
};
