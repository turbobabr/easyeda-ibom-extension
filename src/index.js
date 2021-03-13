import { registerCommand } from './easy-api';
import './styles.scss';
import frameHTML from './frame.html';
import { buildIBomHTML } from './html-builder';

registerCommand('showInteractiveBOM', () => {
  $('body').append(frameHTML);
  $('#ibom-close-button').click(() => {
    $('#ibom-container').remove();
  });

  setTimeout(() => {
    buildIBomHTML().then((html) => {
      $('#the-frame').attr('srcdoc', html);
    });    
  }, 1);
});


