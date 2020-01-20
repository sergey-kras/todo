import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { login as makeLogin } from '../api';
import './common.css';

export class Login extends Component {
  state = {
    login: '',
    password: '',
    error: false
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { login, password } = this.state;
    const isLogin = await makeLogin({ login, password });

    if (isLogin) {
      this.props.setIsLogin(true);
    } else {
      this.setState({ error: true });
    }
  };

  handleLogin = (e) => {
    this.setState({ login: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <Container component="main" maxWidth="xs" className="login">
        <CssBaseline />
        <div className="login__avatar">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              value={this.state.login}
              onChange={this.handleLogin}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              value={this.state.password}
              onChange={this.handlePassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <div className="login__button">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </Container>
    );
  }
}
