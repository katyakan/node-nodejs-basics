const parseCommandLineArgs = () => {
  const args = process.argv.slice(2); // Exclude the first two elements which are node executable and script file

  // Parse command line arguments
  const parsedArgs = {};
  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i].replace(/^--/, ''); // Remove leading '--' from property name
    const value = args[i + 1];
    parsedArgs[propName] = value;
  }

  // Print the parsed arguments to the console
  console.log('Parsed Command Line Arguments:');
  for (const [propName, value] of Object.entries(parsedArgs)) {
    console.log(`${propName} is ${value}`);
  }
};

parseCommandLineArgs();
