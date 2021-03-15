import { registerCommand, getSource, getActiveTabInfo } from './easy-api';
import './styles.scss';
import frameHTML from './frame.html';
import { buildIBomHTML } from './html-builder';

registerCommand('showInteractiveBOM', () => {
  $('body').append(frameHTML);
  $('#ibom-close-button').click(() => {
    $('#ibom-container').remove();
  });

  setTimeout(() => {

    const meta = {
      title: 'Project Name',
      owner: 'Unknown',
      date: '2021-03-15',
      revision: '1'
    };

    const pcbInfo = getActiveTabInfo();
    if(pcbInfo) {      
      meta.title = pcbInfo.title || meta.title;
    }

    buildIBomHTML(getSource(), meta).then((html) => {
      $('#the-frame').attr('srcdoc', html);
    });    
  }, 1);
});


registerCommand('generateAndDownload', () => {

  const meta = {
    title: 'Default Title',
    owner: 'Unknown',
    date: '2021-03-15',
    revision: '1'
  };

  const pcbInfo = getActiveTabInfo();
  if(pcbInfo) {
    meta.title = meta.title || pcbInfo.title;
  }

  buildIBomHTML(getSource(), meta).then((html) => {
    const encoded = encodeURIComponent(html);

    // FIXME: Should be refactored!
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.download = 'ibom';    
    a.href = `data:text/html;charset=utf-8,${encoded}`;
    a.click();
    
  });    

});

registerCommand('debug', () => {
  const getBOM = () => {
    return api('editorCall', {
      cmd: 'getBOMFromPCBEditor',
      args: []
    });
  };

  console.log('BOM:');
  console.log(getBOM());
});





