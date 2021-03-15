import _ from 'lodash';
import format from 'date-fns/format';
import { registerCommand, getSource, getActiveTabInfo, getGVars, getBOMFromPCBEditor, makeCommandId} from './easy-api';
import { isRunnerAround } from './runner-api';
import './styles.scss';
import frameHTML from './frame.html';
import { buildIBomHTML } from './html-builder';


const fetchMeta = () => {
  const meta = {
    title: 'Project Name',
    owner: 'Unknown Company',
    date: format(new Date(), 'yyyy-MM-dd'),
    revision: '0'
  };

  const pcbInfo = getActiveTabInfo();
  if (pcbInfo) {
    meta.title = pcbInfo.title || meta.title;
  }

  const gVars = getGVars();
  if (gVars) {
    const username = _.get(gVars, 'globalVariableCookieData.easyeda_user.username');
    if (username) {
      meta.owner = username;
    }
  }

  return Promise.resolve(meta);
};

registerCommand('showInteractiveBOM', () => {
  $('body').append(frameHTML);
  $('#ibom-close-button').click(() => {
    $('#ibom-container').remove();
  });

  fetchMeta().then((meta) => {
    const bom = getBOMFromPCBEditor();
    buildIBomHTML(getSource(), meta, bom).then((html) => {
      setTimeout(() => {
        $('#the-frame').attr('srcdoc', html);
      }, 1);
    });
  })
});


registerCommand('generateAndDownload', () => {
  fetchMeta().then((meta) => {
    const bom = getBOMFromPCBEditor();
    buildIBomHTML(getSource(), meta, bom).then((html) => {
      const fakeLinkTag = document.createElement('a');
      document.body.appendChild(fakeLinkTag);
      fakeLinkTag.download = `${meta.title}_rev${meta.revision}`;
      fakeLinkTag.href = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;
      fakeLinkTag.click();
      document.body.removeChild(fakeLinkTag);
    });
  })
});

registerCommand('visitGithubPage', () => {
  window.open('https://github.com/turbobabr/easyeda-ibom-extension', '_blank');  
});

if(!isRunnerAround() || true) {
  api('createToolbarButton', {    
    fordoctype: 'pcb',
    menu: [
      {
        text: 'Launch...',
        cmd: makeCommandId('showInteractiveBOM')
      },
      {
        text: 'Generate & Download HTML',
        cmd: makeCommandId('generateAndDownload')
      },
      '-',
      {
        text: 'Visit Github Page...',
        cmd: makeCommandId('visitGithubPage')
      }
    ]
  });
}
