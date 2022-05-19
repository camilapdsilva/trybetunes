import React from 'react';
import { getUser } from '../services/userAPI';

export default class Header extends React.Component {
state = {
  loading: true,
  // currentUser: {},
  userName: '',
}

async componentDidMount() {
  const user = await getUser();
  this.setState({ userName: user.name }, () => this.validaEntrada());
}

validaEntrada = () => {
  this.setState({ loading: false });
}

render() {
  const { userName, loading } = this.state;
  return (
    <header data-testid="header-component">
      <h1>Header</h1>
      {loading ? <p>Carregando...</p> : <p data-testid="header-user-name">{userName}</p>}

    </header>
  );
}
}
