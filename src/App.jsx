import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isImagePlacer: false,
      currImage: null
    };
    this.canvasRef = React.createRef();
    this.onImageClick = this.onImageClick.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this);
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

  render() {
    return (
      <>
        <canvas width="500" height="500" ref={this.canvasRef} onClick={this.onCanvasClick}/>
        <img src="../public/shy.jpg" onClick={this.onImageClick}/>
      </>
    );
  }
}

export default App;