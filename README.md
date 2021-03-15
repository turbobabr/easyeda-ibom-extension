![Hero](docs/ibom-github-hero.png?raw=true "Logo")
===========

`iBom for EasyEDA` is a native extension for [EasyEDA](https://easyeda.com/) and [LCEDA: Standard Edition](https://lceda.cn/standard). It is based on the awesome project called [InteractiveHtmlBom](https://github.com/openscopeproject/InteractiveHtmlBom) designed and built by [qu1ck](https://github.com/qu1ck).

Although [InteractiveHtmlBom](https://github.com/openscopeproject/InteractiveHtmlBom) already supports generation of `interactive BOMs` from `EasyEDA` projects, but it involves messing with `Python` scripts and requires to host the generated `html` files somewhere. Since my knowledge of `Python === null`, and my favorite tool for designing electronics is `EasyEDA` - I decided to give it a shot and port it as a native extension. 

Comparing to original solution, `iBom for EasyEDA` is available right within `EasyEDA` itself:
- There is no need to run any `Python` scripts.
- No need to host the produced `html` files.
- `iBom` is always accessible by clicking a single menu button from your `PCB` document!
- It also provides an ability to generate a stand-alone `HTML` representation the same way [InteractiveHtmlBom](https://github.com/openscopeproject/InteractiveHtmlBom) does out of the box.

> NOTE: This extension is still in **ALPHA/BETA** stage - a lot of things should be done in order to make it fully compatible with `EasyEDA`. 

## Installation

1. Download [easyeda-ibom-v0.0.4.zip](https://github.com/turbobabr/easyeda-ibom-extension/releases/download/v0.0.4/easyeda-ibom-v0.0.4.zip)
2. Un-zip the downloaded archive on your hard drive.
3. Go to `Extension Settings` dialog by using main menu `Advanced -> Extensions -> Extensions Settings...`.
4. Click `Load Extension...` button and add all the files in from the extracted folder using `Select Files...` button. 
5. Click `Load Extension` and close the `Extension Settings` dialog.

## Usage

usage description

## Feedback

If you discover  any issue or have any suggestions for improvement of the plugin, please [open an issue](https://github.com/turbobabr/easyeda-ibom-extension/issues) or find me on twitter [@turbobabr](http://twitter.com/turbobabr).

## Credits 

This solution uses:
- [InteractiveHtmlBom](https://github.com/openscopeproject/InteractiveHtmlBom) as a core component. ⭐⭐⭐⭐⭐
- A `"hackable"` nature of `EasyEDA/LCEDA` - thank you guys for allowing us messing with the product! 👏👏👏
- [svg-path-bbox](https://github.com/mondeja/svg-path-bbox) for calculating various bounding boxes during `EasyEDA` -> `InteractiveHTMLBOM` data conversions.


## License

MIT License

Copyright (c) 2021 Andrey Shakhmin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
