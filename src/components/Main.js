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

var ImgFigure = React.createClass({
   render:function(){
     return(
        <figure className="img-figure">
           <img src={this.props.data.imageURL}
                alt={this.props.data.title}/>
           <figcaption>
               <h2 className="img-title">{this.props.data.title}</h2>
           </figcaption>
        </figure>
     );
   }
});

var  AppComponent = React.createClass({
  Constant:{
    centerPos:{
      left: 0,
      right:0
    },
    hPosRange:{
      leftSecX:[0,0],
      rightSecX:[0,0],
      y:[0,0]
    },
    vPosRange:{
      x:[0,0],
      topY:[0,0]
    }
  },

  componentDidMount: function() {
    //get section dom size
    var stageDOM = Reacat.findDOMNode(this.refs.stage),
        stageW = stageDom.scrollWidth,
        stageH = stageDom.scrollHeight,
        halfStageW = Math.ceil(stageW /2 ),
        halfStageH = Math.ceil(stageH /2 );
    //get imgFigure size
    var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW /2),
        halfImgH = Math.ceil(imgH /2);
    //cal center img postition
    this.Constant.centerPos = {
        left : halfStageW - halfImgW,
        top: halfStageH - halfImgH
    }
    //cal left right img position range
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;
    //cal top img size range
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfImgW - imgW;
    this.Constant.vPosRange.x[1] = halfImgW;

    this.rearrange(0);
  },
  //reset center img
  rearrange: function(centerIndex){
    var imgsArrangerArr = this.state.imgsArrangerArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPostRange = Constant.vPostRange,
        

  },
  getInitalStage: function(){
     return {
        imgsArrangerArr: []
     };
  },
  render() {

    var controllerUnits = [];
    var imgFigures = [];

    imageDatas.forEach(function(value, index) {
      if(!this.state.imgsArrangerArr[index]){
          this.state.imgsArrangerArr[index] = {
            pos: {
              left : 0,
              top: 0
            }
           
          }
      }
      imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index}/>);
    }.bind(this));

    return (
       <section className="stage" ref="stage">
          <section className="img-sec">
             {imgFigures}
          </section>
          <nav className="controller-nav">
             {controllerUnits}
          </nav>
       </section>
    );
  }
});

AppComponent.defaultProps = {
};

export default AppComponent;
