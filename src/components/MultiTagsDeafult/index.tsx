import { MultiTags } from "@/components/MultiTagsDeafult/styled";
import { KeyboardEventHandler, useContext, useEffect, useState } from "react";
import { isEmpty, tx } from "@/utils/functions";
import { RulesContext } from "@/components/console/CoursesList";
import { Option } from "@/types";

const components = {
  DropdownIndicator: null
};

const createOption = (label: string) => ({
  label,
  value: label
});

type MultiTagsDefaultProps = {
  options: Option[];
  keyRule: number;
};

export const MultiTagsDefault = ({
  options,
  keyRule
}: MultiTagsDefaultProps) => {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<readonly Option[]>(options);
  const rulesContext = useContext(RulesContext);

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        let inputValueLower = inputValue.toLowerCase();
        let allRules: any = rulesContext.getValue();
        let onlyLabels = allRules[keyRule]?.map((r: any) => r.label);
        if (onlyLabels?.indexOf(inputValueLower) === -1) {
          allRules[keyRule].push(createOption(inputValueLower));
          rulesContext.next(allRules);
        }
        setInputValue("");
        event.preventDefault();
    }
  };

  const handleDeleteTag = (newValue: any) => {
    let allRules: any = rulesContext.getValue();
    allRules[keyRule] = newValue;
    rulesContext.next(allRules);
    setValue(newValue);
  };

  useEffect(() => {
    if (isEmpty(options) && isEmpty(value)) {
      setValue(rulesContext.getValue()[keyRule]);
    }
  }, []);

  return (
    <MultiTags
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue: any) => handleDeleteTag(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder={tx("addRulesSelect")}
      value={value}
    />
  );
};
