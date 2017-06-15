import React from 'react';

import Logo from './Logo';

export default class Loader extends React.Component{

  constructor(props){
    super(props);

    this.state = {
    }
  }

  componentWillMount(){}

  componentDidMount(){}

  render(){
    return(
      <div className="frame">
        <Logo/>
        <div className="center">
      		<svg width="75px" height="75px" viewBox="0 0 100 100">
      			<circle className="bg" cx="50" cy="50" r="46"/>
      			<circle className="loader" cx="50" cy="50" r="46"/>
      		</svg>
        </div>
      </div>
    );
  }
}
