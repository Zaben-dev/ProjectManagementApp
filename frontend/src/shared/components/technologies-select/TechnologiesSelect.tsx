import React, { useMemo, ReactElement } from 'react';

import { SelectBase } from 'ui';

import { Technology } from 'core/api';
import { useTechnologiesProvider } from 'core/technologies';

import { TechnologyChip } from 'shared/components';

import ListItem from './list-item';

import csx from './TechnologiesSelect.scss';

namespace TechnologiesSelect {
  export interface Props {
    children: ReactElement;
    value: { [key: string]: boolean };
    onSelect: SelectBase.OnSelect;
  }
}

const makeItems = (
  technologies: Technology[],
  value: { [key: string]: boolean }
) => (): SelectBase.Item<Technology>[] =>
  technologies.map(
    ({ id, name, pictureUrl }) =>
      ({
        dataIdx: '' + id,
        label: name,
        pictureUrl,
        value: !!value[id]
      } as SelectBase.Item<Technology>)
  );

const TechnologiesSelect = ({ children, value, onSelect }: TechnologiesSelect.Props) => {
  const { loading, technologies } = useTechnologiesProvider();

  const items = useMemo(makeItems(technologies, value), [technologies, value]);

  return (
    <SelectBase<Technology>
      loading={loading}
      listItem={ListItem}
      items={items}
      renderSelectedItem={({ dataIdx, label, pictureUrl }) => (
        <TechnologyChip
          className={csx.selectItem}
          name={label}
          url={pictureUrl}
          onClick={() => onSelect(dataIdx, false)}
        />
      )}
      onSelect={onSelect}
    >
      {children}
    </SelectBase>
  );
};

export default TechnologiesSelect;
