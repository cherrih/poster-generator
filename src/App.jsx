import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isImagePlacer: false,
      currImage: null,
      colors: [],
      lastX: 0,
      lastY: 0
    };
    this.canvasRef = React.createRef();
    this.onImageClick = this.onImageClick.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onColorClick = this.onColorClick.bind(this);
    this.onCanvasMouseOver = this.onCanvasMouseOver.bind(this);
    this.onCanvasMouseEnter = this.onCanvasMouseEnter.bind(this);
  }

  onImageClick(e) {
    this.setState({
      isImagePlacer: true,
      currImage: e.target
    })
  }

  onCanvasClick(e) {
    const { currImage, isImagePlacer } = this.state;
    if (isImagePlacer) {
      // add pic to canvas at e.pageX, e.pageY
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      ctx.drawImage(currImage, (e.pageX - (.5 * currImage.width)), (e.pageY - (.5 * currImage.height)));
      this.setState({
        isImagePlacer: false,
        currImage: null
      })
    }
  }

  onColorClick(e) {
    const { colors } = this.state;
    const color = e.target.id;
    var newColors;
    if (colors.length < 5) {
      newColors = colors.concat(color);
    } else {
      colors.unshift();
      newColors = colors.concat(color);
    }
    this.setState({
      colors: newColors
    });
  }

  onCanvasMouseOver(e) {
    console.log('mousing');
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;
    context.moveTo(this.state.lastX, this.state.lastY);
    context.lineTo(e.pageX, e.pageY);
    context.stroke();
    context.closePath();
    this.setState({
      lastX: e.pageX,
      lastY: e.pageY
    })
  }

  onCanvasMouseEnter(e) {
    this.setState({
      lastX: e.pageX,
      lastY: e.pageY
    })
  }

  render() {
    return (
      <>
        <canvas width="500" height="500" ref={this.canvasRef} onClick={this.onCanvasClick} onMouseEnter={this.onCanvasMouseEnter} onMouseMove={this.onCanvasMouseOver}/>
        <img src="../public/shy.jpg" onClick={this.onImageClick}/>
        <div className="colorWheels">
          <div className="colorStyle" id="blue" style={{backgroundColor: 'blue'}} onClick={this.onColorClick} />
          <div className="colorStyle" id="red" style={{backgroundColor: 'red'}} onClick={this.onColorClick} />
          <div className="colorStyle" id="pink" style={{backgroundColor: 'pink'}} onClick={this.onColorClick} />
          <div className="colorStyle" id="green" style={{backgroundColor: 'green'}} onClick={this.onColorClick} />
        </div>
      </>
    );
  }
}

export default App;