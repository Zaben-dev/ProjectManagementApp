import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Checkbox, Select } from 'ui';

import { Form } from 'utils';

import { TechnologiesContext } from 'core/technologies';

import csx from './TemplatesSearch.scss';

const config: Form.Config = [{ label: 'Query' }, { label: 'Technologies', value: [] }];

export const TemplatesSearch = () => {
  const history = useHistory();

  const { technologies } = useContext(TechnologiesContext);

  const [{ fields }, change, directChange, submit] = Form.useManager(config);

  const setTechnologiesSelection = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
      const id = +e.currentTarget.getAttribute('data-id');
      const mappedTechnologies: Checkbox.Props[] = fields[1].value.map((item: Checkbox.Props) =>
        id === item.dataId
          ? {
              ...item,
              value
            }
          : item
      );

      directChange([1], [mappedTechnologies]);
    },
    [fields]
  );

  const handleSubmit = useCallback(
    (e: Form.Events.Submit) => {
      const isInvalid = submit(e);

      if (isInvalid) {
        return;
      }

      const [{ value: query }] = fields;

      history.push(`/app/templates/all?query=${query}`);
    },
    [fields]
  );

  useEffect(() => {
    const mappedTechnologies: Checkbox.Props[] = technologies.map(({ id, name }) => ({
      dataId: id,
      label: name,
      value: false
    }));

    directChange([1], [mappedTechnologies]);
  }, [technologies]);

  return (
    <form className={csx.templatesSearch} onSubmit={handleSubmit}>
      <input
        data-idx={0}
        placeholder="Find your template..."
        className={csx.input}
        value={fields[0].value}
        onChange={change}
      />

      <Select
        label="Technologies *"
        placeholder="All technologies"
        className={csx.select}
        openClass={csx.selectMenuOpen}
        items={fields[1].value}
        onSelect={setTechnologiesSelection}
      />

      <Button type="submit" className={csx.confirmSearchBtn}>
        <SearchIcon />
      </Button>
    </form>
  );
};
