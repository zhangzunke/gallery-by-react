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
import ReactDOM from 'react-dom';

let yeomanImage = require('../images/yeoman.png');
//get a random value with in range 
function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}
//get a random value in 0~30
function get30DegRandom(){
    return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

var ImgFigure = React.createClass({
   handleClick: function(e){
      //console.log('Mike');
      if(this.props.arrange.isCenter){
        this.props.inverse();
      }else{
        this.props.center();
      }
      
      //console.log('Zhang');
      e.stopPropagation();
      e.preventDefault();
   },
   render:function(){
     
     var styleObj = {};

     if(this.props.arrange.pos){
       styleObj = this.props.arrange.pos;
     }
     //if the rotate is not equal 0, then add the rotate
     if (this.props.arrange.rotate) {
          (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
            styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
          }.bind(this));
        }

     if(this.props.arrange.isCenter){
       styleObj.zIndex = 11;
     }

     var imgFigureClassName = 'img-figure';
         imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

     return(
        <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
           <img src={this.props.data.imageURL}
                alt={this.props.data.title}/>
           <figcaption>
                <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                      <p>
                        {this.props.data.desc}
                      </p>
                    </div>
           </figcaption>
        </figure>
     );
   }
});

//controller component
var ControllerUnit = React.createClass({
  handleClick: function(e){
     //if click current is checked, inverse the image
     if(this.props.arrange.isCenter){
       this.props.isInverse();
     }else{
       this.props.center();
     }
  },
  render: function(){
    var controllerUnitClassName = "controller-unit";
    if(this.props.arrange.isCenter){
      controllerUnitClassName += " is-center";
      if(this.props.arrange.isInverse){
        controllerUnitClassName += " is-inverse";
      }
    }
    return(
      <span className="controller-unit" onClick={this.handleClick} className={controllerUnitClassName}>
      </span>
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
  //image inverse, this function will be return a {function}
  inverse: function(index){
     return function(){
       var imgsArrangeArr = this.state.imgsArrangeArr;
       imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
       this.setState({
         imgsArrangeArr : imgsArrangeArr
       });
     }.bind(this);
  },
  componentDidMount: function() {
    //get section dom size
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW /2 ),
        halfStageH = Math.ceil(stageH /2 );
    //get imgFigure size
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
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
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  },
  //reset center img
  rearrange: function(centerIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),

        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
        //get center image index  center image is not need to rotate
        imgsArrangeCenterArr[0] = {
          pos: centerPos,
          rotate : 0,
          isCenter : true
        };

        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
        //set top image postition
        imgsArrangeTopArr.forEach(function (value, index) {
          imgsArrangeTopArr[index] = {
            pos: {
                top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
            },
            rotate : get30DegRandom(),
            isCenter : false
          };
        });

        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;

            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] = {
              pos: {
                  top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                  left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
              },
              rotate : get30DegRandom(),
              isCenter : false
            };

         }
         //debugger;
          if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });

  },

 // use rearrange function, rearrange image
center : function(index){
   return function(){
     this.rearrange(index);
   }.bind(this);
},

  getInitialState: function(){
     return {
        imgsArrangeArr: [
          /*{
            pos:{
              left: 0,
              top:0
            },
            rotate : 0,  // image rotate
            isInverse: false, //image inverse
            isCenter: false //image is center or not 
          }*/
        ]
     };
  },
  render() {

    var controllerUnits = [];
    var imgFigures = [];

    imageDatas.forEach(function(value, index) {
      if(!this.state.imgsArrangeArr[index]){
          this.state.imgsArrangeArr[index] = {
            pos: {
              left : 0,
              top: 0
            },
            rotate: 0,  // image rotate
            isInverse: false,
            isCenter: false
          }
      }
      imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index} arrange = {this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}
       center={this.center(index)}/>);
      controllerUnits.push(<ControllerUnit key={index} arrange = {this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}
       center={this.center(index)}/>);
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
