import React from 'react';
import Header from '../components/Header';

export default class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Sou Profile</h1>
      </div>
    );
  }
}
