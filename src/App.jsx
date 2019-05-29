import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isImagePlacer: false,
      isDrawing: true,
      currImage: null,
      colors: ['red', 'purple', 'blue', 'green'],
      lastX: 0,
      lastY: 0,
      image: null
    };
    this.canvasRef = React.createRef();
    this.onImageClick = this.onImageClick.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onColorClick = this.onColorClick.bind(this);
    this.onCanvasMouseOver = this.onCanvasMouseOver.bind(this);
    this.onCanvasMouseEnter = this.onCanvasMouseEnter.bind(this);
    this.saveImage = this.saveImage.bind(this);
    this.toggleDraw = this.toggleDraw.bind(this);
  }

  onImageClick(e) {
    this.setState({
      isImagePlacer: true,
      currImage: e.target,
      isDrawing: false
    })
  }

  onCanvasClick(e) {
    const { currImage, isImagePlacer } = this.state;
    if (isImagePlacer) {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
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
      colors.shift();
      newColors = colors.concat(color);
    }
    this.setState({
      colors: newColors
    });
  }
  getGradient(context) {
    const { colors, lastX, lastY } = this.state;
    const gradient = context.createLinearGradient(lastX - 100, lastY - 100, lastX + 100, lastY + 100);
    let j = 0;
    let coord = 0;
    for (let i = 0; i < 5; i ++) {
      if (j > colors.length - 1) j = 0;
      gradient.addColorStop(coord, colors[j]);
      coord += 0.2;
      gradient.addColorStop(coord, colors[j]);
      j++;
    }
    return gradient;
  }

  onCanvasMouseOver(e) {
    const { lastX, lastY, isImagePlacer, isDrawing } = this.state;
    if (isImagePlacer || !isDrawing) return;
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    context.beginPath();
    const gradient = this.getGradient(context);
    context.strokeStyle = gradient;
    context.lineWidth = 200;
    context.lineJoin = 'bevel';
    context.lineCap = 'round';
    context.moveTo(lastX, lastY);
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
  saveImage() {
    let image = this.canvasRef.current.toDataURL('image/png');
    this.setState({ image });
  }
  toggleDraw() {
    this.setState({
      isDrawing: !this.state.isDrawing
    })
  }

  render() {
    const { image, isDrawing } = this.state;
    return (
      <>
        <canvas width="500" height="500" ref={this.canvasRef} onClick={this.onCanvasClick} onMouseEnter={this.onCanvasMouseEnter} onMouseMove={this.onCanvasMouseOver}/>
        <img src="../public/shy.jpg" onClick={this.onImageClick}/>
        <div className="colorWheels">
          <div className="colorStyle" id="blue" style={{backgroundColor: 'blue'}} onClick={this.onColorClick} />
          <div className="colorStyle" id="red" style={{backgroundColor: 'red'}} onClick={this.onColorClick} />
          <div className="colorStyle" id="pink" style={{backgroundColor: 'pink'}} onClick={this.onColorClick} />
          <div className="colorStyle" id="green" style={{backgroundColor: 'green'}} onClick={this.onColorClick} />
          <div className="colorStyle" id="yellow" style={{backgroundColor: 'yellow'}} onClick={this.onColorClick} />
          <div className="colorStyle" id="white" style={{backgroundColor: 'white'}} onClick={this.onColorClick} />
          <div className="colorStyle" id="black" style={{backgroundColor: 'black'}} onClick={this.onColorClick} />
          <button onClick={this.toggleDraw}>{isDrawing ? 'stop drawing' : 'let me draw'}</button>
        </div>
        <button onClick={this.saveImage}>Save me!</button>
        <img src={image}/>
      </>
    );
  }
}

export default App;