/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import tokenService from '../../services/token/tokenService';
import userService from '../../services/user/userService';

import './NavBar.css';

function NavBar({ selected, orders, haveProducts }) {
  const history = useHistory();

  const [userName, setUserName] = useState('');
  useEffect(() => {
    const userNameAux = userService.getUserName();
    setUserName(userNameAux);
  }, []);

  function orderPath() {
    const role = userService.getUserRole();
    switch (role) {
    case 'customer':
      return '/customer/orders';
    case 'seller':
      return '/seller/orders';

    default:
      break;
    }
  }

  return (
    <div className="container_nav_main">
      <div className="container_section_user">
        <p
          // className={ `${selected === 'costumer' ? 'selected' : ''} costumer` }
          className="costumer"
          data-testid="customer_products__element-navbar-user-full-name"
          // será esse botão leva pra ma rota de edição do usuário?
          /*  onClick={ () => history.push('/costumer') } */
        >
          { userName }
        </p>
        <div
          className="container_logo"
        >
          GoDrink
        </div>
        <button
          type="button"
          // className={ `${selected === 'exit' ? 'selected' : ''} exit` }
          className="exit"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            history.push('/login');
            tokenService.clearLocalStorage();
          } }
        >
          Sair
        </button>
      </div>
      <nav className="container_buttons_menu">
        {haveProducts
        && (
          <button
            type="button"
            className={ `products${selected === 'products' ? ' selected' : ''}` }
            data-testid="customer_products__element-navbar-link-products"
            onClick={ () => history.replace('/customer/products') }
          >
            Produtos
          </button>
        )}
        <button
          type="button"
          className={ `orders${selected === 'orders' ? ' selected' : ''}` }
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => history.replace(orderPath()) }
        >
          {orders}
        </button>
      </nav>
    </div>
  );
}

NavBar.propTypes = {
  selected: PropTypes.string.isRequired,
  orders: PropTypes.string.isRequired,
  haveProducts: PropTypes.bool,
};

NavBar.defaultProps = {
  haveProducts: false,
};

export default NavBar;
