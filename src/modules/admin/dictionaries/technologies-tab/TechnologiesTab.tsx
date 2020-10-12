import React, { useMemo, useCallback } from 'react';

import { Table } from 'ui';

import TechnologiesProvider, { useTechnologiesProvider } from 'core/technologies';

import { useTechnologiesSearch } from './useTechnologiesSearch';

import Search from '../search';
import TableData from '../table-data';

const TechnologiesTab = () => {
  const { technologies, loading } = useTechnologiesProvider();

  useTechnologiesSearch();

  const handleDelete = useCallback(() => {}, []);

  const technologiesTableData = useMemo(() => TableData(technologies, handleDelete), [
    handleDelete,
    technologies
  ]);

  return (
    <div>
      <Search name="Technology" />
      {loading || <Table data={technologiesTableData} config={TableData.CONFIG} />}
    </div>
  );
};

export default () => (
  <TechnologiesProvider>
    <TechnologiesTab />
  </TechnologiesProvider>
);
