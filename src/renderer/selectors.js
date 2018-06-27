export const getConfig = state => state.config;

export const getConfigOfSource = type => state => {
  const config = getConfig(state);
  return config.sources.find(subConfig => subConfig.type === type);
};

export const getQuery = state => state.query;
