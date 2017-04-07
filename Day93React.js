var React = require('react');
var ReactDOM = require('react-dom');

var MainInterface = React.createClass({
  getInitialState: function() {
    return {

        myApointments : []

    } //return
  }, //getInitialState
      componentDidMount: function(){

           this.serverRequest = $.get('./js/data.json', function(result){
              var tempArrPets = result;
              this.setState({
                myApointments: tempArrPets
              }); //set state
          }.bind(this));
      },
      componentWillUnmount: function(){
        this.serverRequest.abort();
      },
  render: function() {
          var filteredApt = this.state.myApointments;
          filteredApt= filteredApt.map(function(item,index){
              return (
                
                            <li className ="pet-item media" key = {index}> 
                            <div className ="pet-info media-body">
                            <div className= "pet-head">
                            <span className="pet-name">{this.state.myApointments[index].petName}</span>
                            <span className ="apt-date pull-right">{this.state.myApointments[index].aptDate}</span>
                          </div>
                         <div className="owner-name">
                         <span className="label-item">Owner:</span>{this.state.myApointments[index].ownerName}
                         <div className="apt-notes">{this.state.myApointments[index].aptNotes}</div>
      
                         </div> 
                        </div>
                      </li>
              ) //rendering data as HTML fuction     

          }.bind(this)); //filtering an array of data! 

    return (
            <div className="interface">
                  <ul className="item-list media-list">{filteredApt}</ul>
            </div>
    )//return
  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
); //render
