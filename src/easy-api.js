import { get } from 'lodash';

export const shortId = () => {
  return 'ibom';
};

export const makeCommandId = (commandId) => {
  return `extension-${shortId()}-${commandId}`;
};

export const registerCommand = (id, callback = () => {}) => {
  return api('createCommand', {
    [makeCommandId(id)]: callback
  });
};

export const navigateToPage = (url) => {
  window.open(url, '_blank');
};

export const doCommand = (command, args = []) => {
  return api('doCommand', {
    cmd: command,
    args: args
  });
};

export const getSource = () => {
  return api('getSource', {
    type: 'json'
  });
};

export const getActiveTabInfo = () => {
  return callByEditor({
    func: 'getActiveTabInfo',
    args: []
  });
};

export const getGVars = () => {
  return callByEditor({
    func: "getGvars",
    args: []
  });
};

export const getBOMFromPCBEditor = () => {
  return api('editorCall', {
    cmd: 'getBOMFromPCBEditor',
    args: []
  });
};

export function getManifest() {
  return get(easyeda,'extension.instances.ibom.manifest');
};