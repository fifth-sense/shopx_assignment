
import React from 'react'
import './App.css';
import { connect } from 'react-redux';
import {
  getListData,
  addListData,
  deleteListData,
  toggleRadio
} from './redux/action/action'

function validate(currentText) {
  // true means invalid, so our conditions got reversed
  return {
    currentText: currentText.length === 0,

  };
}
let listSize = 0;
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentText: "",
      activeIndex: 'ALL',
      count: 0,
      error: '',

    }
    props.getListData()

  }
  renderData = () => {
    const { listData = [] } = this.props;
    let that = this
    let _listData = listData;
    if (this.state.activeIndex === "active") {
      _listData = _listData.filter(it => it.type === "active")

    } else if (this.state.activeIndex === "completed") {
      _listData = _listData.filter(it => it.type === "completed")

      listSize = _listData.length;

    }

    return _listData.map((data, index) => {
      return (
        <tr className="renderDataApitr" key={index}>
          <input className="renderDataApiInput " type='radio' onChange={() => this.toggleRadio(index)} />
          <td style={{ textDecorationLine: data.type === "completed" ? 'line-through' : 'none', padding: '10px', display: 'flex', flex: 1 }}>{data.data}</td>
          <button id="buttoncross" className="renderDataApi" onClick={() => this.deleteData(data.data)}>X</button>
        </tr>

      )
    })

  }

  updateData = (data) => {
    if (this.state.currentText === '') {
      console.log("in if")
      this.setState({ error: "Required" })
    } else {
      console.log("in else")
      let ob = {
        type: 'active',
        data: this.state.currentText

      }
      this.props.addListData(ob)
      this.setState({ currentText: '', error: '' })
    }


  }

  deleteData = (data) => {
    const prevListData = this.props.listData;
    const updateListData = this.props.listData.filter(it => it.data !== data)
    console.log("updatedListData", updateListData)
    this.props.deleteListData(updateListData)
  }

  toggleRadio = (index) => {
    this.props.toggleRadio(index)
  }
  onInputChange = event => {
    console.log("event target", event.target.value)

    this.setState({ currentText: event.target.value })

  }
  canBeAdded() {
    let err = validate(this.state.currentText)
    return !err
  }
  handleSubmit() {

    if (!this.canBeAdded)
      this.updateData();

  }

  render() {


    return (
      <div className='App'>

        <h1>my list</h1>
        <div className="line">
          <br />
          <ul>
            <li> {listSize} items completed </li>
            <li><button onClick={() => this.setState({ activeIndex: 'ALL' })}> ALL </button></li>
            <li><button onClick={() => this.setState({ activeIndex: 'active' })}> ACTIVE</button></li>
            <li><button onClick={() => this.setState({ activeIndex: 'completed' })}> COMPLETED</button></li>
            <li><button onClick={() => this.props.deleteListData([])} >CLEAR COMPLETED</button> </li>
          </ul>

          <div className="card-div">
            <div >
              <div className="firstrow">
                <input
                  type="text"
                  name="currentText"
                  value={this.state.currentText}
                  required="Required"
                  placeholder="What needs to be done?"
                  className="input-style"
                  onChange={this.onInputChange}
                />

                <button className="done-button" onClick={() => this.updateData()}>Done</button>

              </div>
              {this.state.error !== '' ? <span style={{ color: 'red' }}>{this.state.error}</span> : ''}

              <div className="renderDataCss">
                {this.renderData()}
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    listData: state.listData
  }
}

const mapDispatchToProps = {
  getListData,
  addListData,
  deleteListData,
  toggleRadio
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
