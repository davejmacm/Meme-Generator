import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    };
    this.updateText = this.updateText.bind(this);
    this.genMeme = this.genMeme.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;

        this.setState({ allMemeImgs: memes });
      });
  }

  updateText(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  genMeme(event) {
    event.preventDefault();

    var memes = this.state.allMemeImgs;
    var memeDetails = memes[Math.floor(Math.random() * memes.length)];
    var url = memeDetails.url;
    this.setState({ randomImg: url });
  }

  render() {
    return (
      <div className="meme-wall">
        <p>Here comes the Spiccceeee</p>

        <form className="meme-form" onSubmit={this.genMeme}>
          <input
            type="text"
            name="topText"
            placeholder="top-text"
            value={this.state.topText}
            onChange={this.updateText}
          />
          <input
            type="text"
            name="bottomText"
            placeholder="bottom-text"
            value={this.state.bottomText}
            onChange={this.updateText}
          />
          <button>Gen</button>
        </form>
        <div className="meme-pic">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
