const parseEnv = () => {
  const envPrefix = 'RSS_';

  const allEnvVariables = process.env;


  const rssEnvVariables = Object.entries(allEnvVariables)
    .filter(([key]) => key.startsWith(envPrefix))
    .reduce((result, [key, value]) => {
      result[key] = value;
      return result;
    }, {});


  console.log('RSS Environment Variables:');
  for (const [key, value] of Object.entries(rssEnvVariables)) {
    console.log(`${key}=${value}`);
  }
};

parseEnv();
  