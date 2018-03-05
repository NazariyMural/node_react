// import React, { Component } from "react";
// import RaisedButton from "material-ui/RaisedButton";
// import TextField from "material-ui/TextField";
// import CloseIcon from "material-ui/svg-icons/navigation/cancel";
// import { connect } from "react-redux";
// import { login, storeUser, logout } from "../../actions";

// class EmailLogIn extends Component {
//   state = {
//     email: "",
//     password: "",
//     name: "",
//     error: false,
//     value: "",
//     signUpClicked: false
//   };
//   //Updaters of state
//   handleChangeEmail = ev => {
//     let email = ev.target.value;
//     this.setState({ email });
//   };
//   handleChangePassword = ev => {
//     let password = ev.target.value;
//     this.setState({ password });
//   };
//   handleChangeName = ev => {
//     let name = ev.target.value;
//     this.setState({ name });
//   };
//   ///////////////////////////////////////

//   //Helper method wich allow us change styling from error to normal, and turn on the new Markup inside of Paper componnet
//   handleSignUpEmailFrormShow = (ev, email, password) => {
//     this.setState({ error: false });
//     this.setState({ signUpClicked: true });
//     if (email && password) {
//       this.handleSignUpEmailSubmit();
//     }
//   };
//   //Method wich allow us to store (registr) user inside firebase
//   handleSignUpEmailSubmit = () => {
//     const userData = { ...this.state };
//     this.props.storeUser(userData);
//   };

//   handleLogIn = () => {
//     const userData = { ...this.state };
//     this.props.login(userData);
//   };
//   handleLogOut = () => {
//     this.props.logout();
//   };

//   //weill be executed if user click on the LogIn button and it can return error or resolve
//   handleSubmit = (email, password) => {
//     if (!(email || password)) {
//       this.setState({ error: true });
//       return;
//     }

//     if (this.state.error) {
//       this.setState({ email: "", password: "" });
//       return;
//     }
//   };

//   render() {
//     let showField = (
//       <div>
//         <TextField
//           onChange={ev => this.setState({ email: ev.target.value })}
//           inputStyle={classes.InputField}
//           hintText="email"
//           floatingLabelText="Введіть Ваш Email"
//         />
//         <br />
//         <TextField
//           onChange={ev => this.setState({ password: ev.target.value })}
//           hintText="Password Field"
//           floatingLabelText="Введіть Ваш пароль"
//           type="password"
//         />
//         <br />
//         <RaisedButton
//           style={classes.buttonBlock}
//           onClick={this.handleSignUpEmailSubmit}
//           label="Store user"
//           primary={true}
//         />
//         <RaisedButton
//           style={classes.buttonBlock}
//           onClick={this.handleLogIn}
//           label="Log In"
//           primary={true}
//         />
//         <RaisedButton
//           style={classes.buttonBlock}
//           onClick={this.handleLogOut}
//           label="Log out"
//           primary={false}
//         />
//         <RaisedButton
//           style={classes.buttonBlock}
//           onClick={() =>
//             this.handleSignUpEmailFrormShow(
//               this.state.email,
//               this.state.password
//             )
//           }
//           label="Sign Up"
//         />
//         <br />
//       </div>
//     );
//     if (this.state.error) {
//       showField = (
//         <div>
//           <TextField
//             value={this.state.email}
//             onChange={ev => this.handleChangeEmail(ev)}
//             inputStyle={classes.InputField}
//             hintText="email"
//             errorText="wrong email"
//           />
//           <br />
//           <TextField
//             value={this.state.password}
//             onChange={ev => this.handleChangePassword(ev)}
//             hintText="Password Field"
//             errorText="wrong password"
//             type="password"
//           />
//           <br />
//           <RaisedButton
//             style={classes.buttonBlock}
//             onClick={this.handleSignUpEmailSubmit}
//             label="Log In"
//             primary={true}
//           />
//           <RaisedButton
//             style={classes.buttonBlock}
//             onClick={() =>
//               this.handleSignUpEmailFrormShow(
//                 this.state.email,
//                 this.state.password
//               )
//             }
//             label="Sign Up"
//           />
//           <br />
//         </div>
//       );
//     }
//     if (this.state.signUpClicked) {
//       showField = (
//         <div>
//           <TextField
//             value={this.state.name}
//             onChange={ev => this.handleChangeName(ev)}
//             inputStyle={classes.InputField}
//             hintText="name"
//             floatingLabelText="Your name"
//           />
//           <br />
//           <TextField
//             value={this.state.email}
//             onChange={ev => this.handleChangeEmail(ev)}
//             inputStyle={classes.InputField}
//             hintText="email"
//             floatingLabelText="Enter your email"
//           />
//           <br />
//           <TextField
//             value={this.state.password}
//             onChange={ev => this.handleChangePassword(ev)}
//             hintText="password"
//             floatingLabelText="Make up password"
//             type="password"
//           />
//           <br />

//           <RaisedButton
//             onClick={() =>
//               this.handleSignUpEmailSubmit(
//                 this.state.email,
//                 this.state.password,
//                 this.state.name
//               )
//             }
//             label="Submit"
//             backgroundColor="rgb(153, 196, 50)"
//           />
//           <br />
//         </div>
//       );
//     }

//     return (
//       <div>
//         {showField}
//         <RaisedButton
//           style={classes.cancel}
//           onClick={this.props.cancelClick}
//           label="Cencel"
//           secondary={true}
//           // backgroundColor='rgb(153, 196, 50)'
//           icon={<CloseIcon />}
//         />
//       </div>
//     );
//   }
// }

// const classes = {
//   Button: {
//     display: "inline-block",
//     width: "70%",
//     fontSize: 16,
//     margin: 0,
//     borderRadius: 10,
//     padding: "0 20px",
//     height: 50,
//     textAlign: "center",
//     varticalAlign: "middle"
//   },
//   buttonBlock: {
//     margin: "20px 10px 0 0"
//   },
//   cancel: {
//     position: "absolute",
//     bottom: 0,
//     left: "50%",
//     transform: "translate(-50%, -50%)"
//   }
// };

// export default connect(null, { login, storeUser, logout })(EmailLogIn);

import React from "react";
// import "whatwg-fetch";
import { Redirect } from "react-router-dom";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { incrementProgress, decrementProgress } from "../../actions/progress";
import { loginAttempt, loginSuccess, loginFailure } from "../../actions/index";

import LoginPage from "./LoginForm";

export class LoginPageContainer extends React.Component {
  constructor(props) {
    super(props);

    // bound functions
    this.attemptLogIn = this.attemptLogIn.bind(this);

    // component state
    this.state = {
      redirect: false
    };
  }

  async attemptLogIn(userData) {
    const {
      decrementProgressAction,
      incrementProgressAction,
      loginAttemptAction,
      loginFailureAction,
      loginSuccessAction
    } = this.props;

    // turn on spinner
    incrementProgressAction();

    // register that a login attempt is being made
    loginAttemptAction();

    // contact login API
    await fetch(
      // where to contact
      "/api/login",
      // what to send
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }
    )
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then(json => {
        if (json) {
          loginSuccessAction(json);
          this.setState({ redirect: true });
        } else {
          loginFailureAction(new Error("Authentication Failed"));
        }
      })
      .catch(error => {
        loginFailureAction(new Error(error));
      });

    // turn off spinner
    decrementProgressAction();
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/account" />;
    }

    return (
      <div>
        <LoginPage loginFunction={this.attemptLogIn} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      incrementProgressAction: incrementProgress,
      decrementProgressAction: decrementProgress,
      loginAttemptAction: loginAttempt,
      loginFailureAction: loginFailure,
      loginSuccessAction: loginSuccess
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(LoginPageContainer);
