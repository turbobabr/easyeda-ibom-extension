import _ from 'lodash';
import { buildBOM } from './bom-builder';

export const buildIBomHTML = () => {
  const fileURLs = easyeda.extension.instances.ibom.blobURLs;
  const ignoreList = ['main.js', 'icon.svg', 'manifest.json', 'locale.txt'];

  const urls = _.chain(fileURLs)
    .map((value, key) => [key, value])
    .filter(pair => !_.includes(ignoreList, pair[0]))
    .fromPairs()
    .value();

  const fetchFile = (fileName, url) => {
    return fetch(url).then((res) => {
      return res.text();
    }).then((content) => {
      return Promise.resolve({
        fileName,
        url,
        content
      });
    });
  };

  const fetchAll = () => {
    return Promise.all(_.map(urls, (url, fileName) => fetchFile(fileName, url))).then((files) => {
      return Promise.resolve(_.chain(files).map(file => [file.fileName, file]).fromPairs().value())
    });
  };


  const defaultConfig = {
    "show_fabrication": false,
    "redraw_on_drag": true,
    "highlight_pin1": false,
    "extra_fields": [],
    "dark_mode": false,
    "bom_view": "left-right",
    "board_rotation": 0.0,
    "checkboxes": "Sourced,Placed",
    "show_silkscreen": true,
    "show_pads": true,
    "layer_view": "FB"
  };

  const replacePlan = {
    '///CSS///': 'ibom.css',
    '///USERCSS///': ' ',
    '///SPLITJS///': 'split.js',
    '///LZ-STRING///': 'lz-string.js',
    '///POINTER_EVENTS_POLYFILL///': 'pep.js',
    '///CONFIG///': `var config = ${JSON.stringify(defaultConfig)};`,
    '///PCBDATA///': 'pcbdata.txt',
    // '///PCBDATA///': `var pcbdata = ${JSON.stringify(buildBOM())};`,
    '///UTILJS///': 'util.js',
    '///RENDERJS///': 'render.js',
    '///IBOMJS///': 'ibom.js',
    '///USERJS///': ' ',
    '///USERFOOTER///': '<!-- USERFOOTER -->',
    '///USERHEADER///': '<!-- USERHEADER -->'
  };

  return fetchAll().then((files) => {
    let html = files['ibom.html'].content;
    _.each(replacePlan, (content, marker) => {
      if (files[content]) {
        html = html.replace(marker, files[content].content);
      } else {
        html = html.replace(marker, content);
      }
    });

    console.log(html);
    
    return Promise.resolve(html);
  })
};