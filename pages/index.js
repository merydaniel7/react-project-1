import React, {useState} from "react";

function ComponentA(props) {
  return (
    <>
      <h1>ComponentA</h1>
      <p>Hello ComponentA</p>
      <div>My Prop1: {props.myProp1}</div>
      <div>My Prop2: {props.myProp2}</div>
      <div>My Prop3: {props.myProp3.toString()}</div>
      <div>My Prop4: {<props.myProp4 />}</div>
    </>
  )
}


class ComponentC extends React.Component {

  constructor() {
    super();
    this.state = {
      value: 0
    }
  }


  changeState(incrementor) {
    this.setState({
      value: incrementor
    })
  }

  render() {
    const { value } = this.state;
    return (
      <>
        <h1>Hello ComponentC</h1>
        Current value: <h1> { this.state.value } </h1>
        <button onClick={() => this.changeState(value + 1)}>+</button>
        <button onClick={() => this.changeState(value - 1)}>-</button>
      </>
    )
  }
}

function Home() {
  const [value, setValue] = useState(0);
  
  return (
    <>
    Current value: <h1> { value } </h1>
    <button onClick={() => setValue(value + 1)}>+</button>
    <button onClick={() => setValue(value - 1)}>-</button>
    <ComponentA
      myProp1={value}
      myProp2="My value"
      myProp3={true}
      myProp4={() => <div>My new JSX</div>}
      />
    </>
  )
}


export default Home;