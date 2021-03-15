
export const isRunnerAround = () => {
  const hasRunnerInstance = easyeda && easyeda.extension && easyeda.extension.instances && easyeda.extension.instances.runner;
  if(!hasRunnerInstance) {
      return false;
  }

  return easyeda.extension.instances.runner.enabled;
}