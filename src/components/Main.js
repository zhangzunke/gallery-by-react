require('normalize.css/normalize.css');
require('styles/App.scss');
//get image data
var imageDatas = require('../data/imageDatas.json');
//get image URL convert image filename to image path
imageDatas = (function genImageURL(imageDatasArr) {
  for (var i = 0; i < imageDatasArr.length; i++){
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
       <section className="stage">
          <section className="img-sec">
          </section>
          <nav className="controller-nav">
          </nav>
       </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
