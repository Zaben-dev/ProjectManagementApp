import React, { createContext, ReactNode, useContext } from 'react';

import { getTechnologies, Technology } from 'core/api';

namespace TechnologiesProvider {
  export interface State {
    loading: boolean;
    error: string;
    technologies: Technology[];
    getTechnologies?(query: string): void;
  }

  export interface Props {
    children: ReactNode;
    getOnMount?: boolean;
  }
}

const STATE: TechnologiesProvider.State = {
  loading: true,
  error: '',
  technologies: []
};

const Context = createContext(STATE);

class Provider extends React.Component<TechnologiesProvider.Props, typeof STATE> {
  componentDidMount() {
    if(this.props.getOnMount) {
      this.getTechnologies();
    }
  }

  getTechnologies = async (query = '') => {
    if (!this.state.loading) {
      this.setState({ ...STATE });
    }

    try {
      const technologies = await getTechnologies(query);
      this.setState({ ...STATE, loading: false, technologies });
    } catch (error) {
      this.setState({ ...STATE, loading: false, error });
    }
  };

  readonly state: typeof STATE = {
    ...STATE,
    getTechnologies: this.getTechnologies
  };

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

const TechnologiesProvider = Provider;

export const useTechnologiesProvider = () => {
  const context = useContext(Context);

  return context;
};

export default TechnologiesProvider;
