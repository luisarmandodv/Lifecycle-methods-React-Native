import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class App extends React.Component {
  /***********************************************************/
  /*
    It’s very important to call super() if our class extends any other class that also has a defined constructor.
    Calling this special function will call the constructor of our parent class and allow it to initialize itself.
    This is why we have access to this.props only after we’ve initially called super.

    This is also the only place where you can use this.state instead of this.setState

    DO:
      * set initial state
      * if not using class properties syntax — prepare all class fields and bind functions that will be passed as callbacks
    
    DON’T
      * cause any side effects (AJAX calls etc.)
  */

  constructor(props) {
    super(props);
    console.log("constructor called.");
    this.state = {
      number: 0,
      mountButtonTitle: "UNMOUNT"
    };
    this.showCounter = true;
  }

  /***********************************************************/

  incrementNumber() {
    this.setState({ number: this.state.number + 1 });
  }

  toggleCounter() {
    if (this.showCounter === true) {
      this.setState({ mountButtonTitle: "MOUNT" });
      this.showCounter = false;
      this.setState({ number: 0 });
    } else {
      this.setState({ mountButtonTitle: "UNMOUNT" });
      this.showCounter = true;
    }
  }

  /***********************************************************/

  /*
    It does not differ much from constructor ( it is also called once only in the initial mounting life-cycle)
    This function might end up being called multiple times before the initial render is called so might result in triggering multiple side-effects.
    Due to this fact it is not recommended to use this function for any side-effect causing operations.

    A setState used in this function is “free” and will not trigger a re-render.

    DO
      * update state via this.setState
      * perform last minute optimization
      * cause side-effects (AJAX calls etc.) in case of server-side-rendering only
    DON’T
      * cause any side effects (AJAX calls etc.) on client side
  */

  componentWillMount() {
    console.log("componentWillMount called.");
  }

  /***********************************************************/

  /*
    This function will be called only once in the whole life-cycle of a given component and 
    it being called signalizes that the component — and all its sub-components — rendered properly.

    Since this function is guaranteed to be called only once, it is a perfect candidate for performing any side-effect causing operations such as AJAX requests.

    DO
      cause side effects (AJAX calls etc.)
    DON’T
      call this.setState as it will result in a re-render
  */

  componentDidMount() {
    console.log("componentDidMount called.");
  }

  /***********************************************************/

  /* This function will be called in each update life-cycle caused by changes to props (parent component re-rendering) and will be
   passed an object map of all the props passed, no matter if the prop value has changed or not since previous re-render phase.

   This function is ideal if you have a component whose parts of state are depending on props passed from parent component as
   calling this.setState here will not cause an extra render call.

   This function might be called multiple times before the render function. it is not recommended to use any side-effect causing operations here.

    DO
      sync state to props

    DON’T
      cause any side effects (AJAX calls etc.)
  */

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps called.");
    if (nextProps.myProp !== this.props.myProps) {
      // nextProps.myProp has a different value than our current prop
      // so we can perform some calculations based on the new value
    }
  }

  /***********************************************************/

  /*
    By default, all class based Components will re-render themselves whenever the props they receiver, their state or context changes.

    This function will be called internally with next values of props, state and object.
  
    Developer can use those to verify that the change requires a re-render or not and return false to prevent the re-rendering from happening.
    In other case, you are expected to return true.

    DO
      use for increasing performance of poor performing Components
    
    DON’T
      cause any side effects (AJAX calls etc.)
      call this.setState
  */

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log("shouldComponentUpdate called.");
    return true;
  }

  /***********************************************************/

  /*
    If the shouldComponentUpdate function is not implemented, or it decided that the component should update in this render cycle,
    another life-cycle function will be called. This function is commonly used to perform state and props synchronization
    for when parts of your state are based on props.

    If shouldComponentUpdate is implemented, this function can be used instead of componentWillReceiveProps.

    This function might be called multiple times before the render function. it is not recommended to use any side-effect causing operations here.

    DO
      * synchronize state to props
       
    DON’T
      * cause any side effects (AJAX calls etc.)
  */

  componentWillUpdate(nextProp, nextState) {
    console.log("componentWillUpdate called.");
  }

  /***********************************************************/

  /*
    This function will be called after render is finished in each of the re-render cycles. This means that
    you can be sure that the component and all its sub-components have properly rendered itself.

    This function is called with object-maps of previous props, state and context, even if no actual change happened to those values. 

    This function is called only once in each re-render cycle, it is recommended to use this function for any side-effect causing operation.

    DO
      cause side effects (AJAX calls etc.)
    
    DON’T
      call this.setState as it will result in a re-render
  */

  componentDidUpdate(prevProps, prevState, prevContext) {
    console.log("componentDidUpdate called.");
    if (prevProps.myProps !== this.props.myProp) {
      // this.props.myProp has a different value
      // we can perform any operations that would
      // need the new value and/or cause side-effects
      // like AJAX calls with the new value - this.props.myProp
    }
  }

  /***********************************************************/

  /*
    Use this function to “clean up” after the component if it takes advantage of timers (setTimeout, setInterval),
    opens sockets or performs any operations we need to close / remove when no longer needed.

    DO
      remove any timers or listeners created in lifespan of the component
    
    DON’T
      call this.setState, start new listeners or timers
  */

  componentWillUnmount() {
    console.log("componentWillUnmount called.");
  }

  /***********************************************************/

  /* 
    it can react to events happening in the child component, specifically to any uncaught errors happening in any of the child components.

    With this addition you can make your parent-element handle the error by setting the error info in state and
    returning appropriate message in its render, or logging to reporting system, e.g.:
    
    When an error happens, the function will be called with:
      * errorString => the .toString() message of the error
      * errorInfo => an object with a single field componentStack which represent the stack trace back to where the error occured, e.g.:
  */

  componentDidCatch(errorString, errorInfo) {
    console.log("componentDidCatch called.");
    //Handle error.
  }

  /***********************************************************/
  render() {
    console.log("render called");
    return (
      <View style={styles.container}>
        {this.showCounter ? (
          <Text style={styles.text}>{this.state.number}</Text>
        ) : null}
        {this.showCounter ? (
          <Button onPress={() => this.incrementNumber()} title="INCREMENT" />
        ) : null}
        <Button
          onPress={() => this.toggleCounter()}
          title={this.state.mountButtonTitle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 31,
    marginBottom: 10
  }
});
