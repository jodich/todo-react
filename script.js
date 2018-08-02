class List extends React.Component {
  constructor(){
    super()
    this.clickHandler = this.clickHandler.bind( this );
    this.keypressHandler = this.keypressHandler.bind( this );
    this.deleteItem = this.deleteItem.bind( this );
    this.deleteDoneItem = this.deleteDoneItem.bind( this );
    this.doneItem = this.doneItem.bind( this );
  }

  state = {
    list : [],
    done: [],
    word : ""
  }

  validation(val) {

    var newList = this.state.list.slice();

    if (val.length <= 1) {
      this.setState( {word: 'word is too short!'} )
    } else if (val.length > 140) {
      this.setState( {word: 'word is too long!'} )
    } else {
      newList.push(val);
      this.setState( {list: newList, word: ""} );
    }

  }

  clickHandler(event){
    var inputBox = event.target.previousSibling;
    this.validation(inputBox.value)
    inputBox.value = '';
  }

  keypressHandler(event){
    if (event.keyCode == 13 || event.which == 13) {
      var inputBox = event.target;
      this.validation(inputBox.value);
      inputBox.value = '';
    }
  }

  deleteItem(event, index) {
    console.log('deleting item with id of', index)
    var valToDelete = document.getElementById(index).textContent
    var newList = this.state.list.slice();
    newList.splice( newList.indexOf(valToDelete) , 1 );
    this.setState( {list: newList} );
  }

  deleteDoneItem(event, doneIndex) {
    console.log('deleting item with id of', doneIndex);
    var valToDelete = document.getElementById(doneIndex).textContent;
    var newDoneList = this.state.done.slice();
    newDoneList.splice( newDoneList.indexOf(valToDelete) , 1 );
    this.setState( {done: newDoneList} );

  }

  doneItem(event, index) {
    console.log('transferring item with id of', index, 'to done col')
    var valToDone = document.getElementById(index).textContent
    var newList = this.state.list.slice();
    var newDoneList = this.state.done.slice();
    newList.splice( newList.indexOf(valToDone) , 1 );
    newDoneList.push( valToDone );

    this.setState( {list: newList, done: newDoneList} )

  }

  render() {

    return (
      <div className="list">
        <h1>HELLO BITCHES</h1>
        <h2>{this.state.word}</h2>
        <input onKeyPress={this.keypressHandler}></input>
        <button onClick={this.clickHandler} >add item</button> 
        <ToDo list={this.state.list} deleteItem={this.deleteItem} doneItem={this.doneItem} />        
        <Done doneList={this.state.done} deleteDoneItem={this.deleteDoneItem} />
      </div>
    );
  }
}

class ToDo extends React.Component {
  render() {

    var toDo = this.props.list.map( (item, index) => {
      return (
        <li key={index} className="toDo-list-item">
          <p id={index}>{item}</p> 
          <button onClick={ (ev) => this.props.deleteItem(ev, index) } >delete</button> 
          <button onClick={ (ev) => this.props.doneItem(ev, index) } >done</button>
        </li>
      )
    });
    
    return (
      <div id="todo">
        <h2>To Do</h2>
        <ul>
          {toDo}
        </ul>
      </div>
    )
  }
}

class Done extends React.Component {
  render() {

    var done = this.props.doneList.map( (item, index) => {
      let doneIndex = 'd-' + index
      return (
        <li key={doneIndex} className="done-list-item">
          <p id={doneIndex}>{item}</p>
          <button onClick={ (ev) => this.props.deleteDoneItem(ev, doneIndex) } >delete</button> 
        </li>
      )
    });
    
    return (
      <div>
        <h2>Done</h2>
        <ul>
          {done}
        </ul>
      </div>
    )
  }
}


ReactDOM.render(
  <List/>,
  document.getElementById('root')
);

