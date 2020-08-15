import React, { useMemo } from 'react';

import Table from 'shared/components/table-grid';
import TechnologiesProvider, { useTechnologiesProvider } from 'core/technologies';
import { Technology } from 'core/api';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Search, { useTechnologiesSearch } from '../search';

const header = ['', 'name', 'description', 'created', 'modified', 'added by', ''];

const getTableData = (technologies: Technology[]): Table.Row[] => {
  const tableData = technologies.slice(0, 10).map((tech) => {
    const row: Table.Row = {
      id: {
        value: tech.id
      },
      name: {
        value: tech.name
      },
      description: {
        value: tech.description.substr(0, 100)
      },
      created: {
        value: '19/Apr/2020'
      },
      modified: {
        value: '19/Apr/2020'
      },
      addedBy: {
        value: 'by przemo',
        component: <div>By przemo</div>
      },
      icon: {
        component: <MoreHorizIcon></MoreHorizIcon>
      }
    };

    return row;
  });

  return tableData;
};

const TechnologiesTab = () => {
  const { technologies, loading } = useTechnologiesProvider();
  useTechnologiesSearch();

  const technologiesTableData = useMemo(() => getTableData(technologies), [technologies, loading]);

  return (
    <div>
      <Search name="Technology" pathname="/app/admin/technologies" />
      <Table data={technologiesTableData} header={header} />;
    </div>
  );
};

export default () => (
  <TechnologiesProvider>
    <TechnologiesTab />
  </TechnologiesProvider>
);
