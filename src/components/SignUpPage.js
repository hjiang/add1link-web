import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Message, Header } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { gotoUrl } from '../actions/miscActions';
import { saveAuthInfo } from '../actions/authActions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class SignUpPage extends React.Component {
  state = {
    requestInFlight: false,
    errorReason: null
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = () => {
    this.setState({ requestInFlight: true });
    const { email, password } = this.state;

    this.props.signUpMutation({
      variables: { email, password }
    }).then(result => {
      const { token, user } = result.data.signUp;
      this.props.actions.saveAuthInfo(user, token);
      this.setState({ requestInFlight: false });
      this.props.actions.gotoUrl('/links');
    }).catch(err => {
      this.setState({
        requestInFlight: false,
        errorReason: err.message  // FIXME: make friendly
      });
    });
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Container style={{ marginTop: '5em', paddingLeft: '2em', paddingRight: '2em' }}>
        <Header as="h1">Sign Up</Header>
        <Form onSubmit={this.handleSubmit} error={!!this.state.errorReason}>
          <Form.Input label="Email" name="email" onChange={this.handleChange} />
          <Form.Input label="Password" name="password" type="password"
            onChange={this.handleChange} />
          {this.state.errorReason && <Message error content={this.state.errorReason} />}
          <Form.Button primary loading={this.state.requestInFlight} type="submit">Submit</Form.Button>
        </Form>
        <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
      </Container>
    );
  }
}

SignUpPage.propTypes = {
  actions: PropTypes.object.isRequired,
  signUpMutation: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ saveAuthInfo, gotoUrl }, dispatch)
  };
}

const SIGNUP_MUTATION = gql`
  mutation SignUpMutation($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(
  graphql(SIGNUP_MUTATION, { name: 'signUpMutation' })(SignUpPage));
