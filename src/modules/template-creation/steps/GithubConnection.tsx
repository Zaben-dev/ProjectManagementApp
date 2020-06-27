import React from 'react';

import { Button, Checkbox, InputField } from 'ui';

import { TemplateManagementStepProps } from '.';

import csx from './GithubConnection.scss';

export const GithubConnection = ({
  formManager: [{ dirty, invalid, fields }, change, directChange],
  onSubmit
}: TemplateManagementStepProps) => {
  const handlePublishAccessChange = (_, checked: boolean) => {
    directChange([1, 2], [checked, !checked]);
  };

  const handlePrivateAccessChange = (_, checked: boolean) => {
    directChange([1, 2], [!checked, checked]);
  };

  return (
    <form onSubmit={onSubmit}>
      <InputField
        data-idx={0}
        label="Repository link *"
        placeholder="Add repository link..."
        error={dirty ? fields[0].error : ''}
        value={fields[0].value}
        onChange={change}
      />
      
      <div className={csx.access}>
        <Checkbox
          variant="informing"
          label="Make the template public - all users will see it"
          value={fields[1].value}
          onChange={handlePublishAccessChange}
        />

        <Checkbox
          variant="informing"
          label="Make the template private - only you will be able 
to view this template"
          value={fields[2].value}
          onChange={handlePrivateAccessChange}
        />
      </div>

      <Button type="submit" disabled={dirty && invalid}>
        NEXT
      </Button>
    </form>
  );
};
