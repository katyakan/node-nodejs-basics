const parseEnv = () => {
  const envPrefix = 'RSS_';

  // Get all environment variables
  const allEnvVariables = process.env;

  // Filter variables with the specified prefix
  const rssEnvVariables = Object.entries(allEnvVariables)
    .filter(([key]) => key.startsWith(envPrefix))
    .reduce((result, [key, value]) => {
      result[key] = value;
      return result;
    }, {});

  // Print the filtered variables to the console
  console.log('RSS Environment Variables:');
  for (const [key, value] of Object.entries(rssEnvVariables)) {
    console.log(`${key}=${value}`);
  }
};

parseEnv();
  