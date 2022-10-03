/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React from 'react';

function CardOrder({ hasAddress, order, testidPrefix, pushUrl }) {
  const { id, totalPrice, deliveryAddress, deliveryNumber, saleDate, status } = order;

  const formatDate = (rawDate) => {
    const dateLimit = 10;
    const date = rawDate.slice(0, dateLimit);
    const dateArr = date.split('-');
    const reverse = dateArr.reverse();
    const formattedDate = reverse.join('/');
    return formattedDate;
  }; // talvez colocar essa função em outro arquivo dps

  const properDate = formatDate(saleDate);

  const history = useHistory();

  return (
    <button
      className="container_order_main"
      type="button"
      onClick={ () => history.push(`${pushUrl}${id}`) }
    >
      <p
        className="order_id"
        data-testid={ `${testidPrefix}element-order-id-${id}` }
      >
        {`Pedido ${id} `}
      </p>
      <div className="container_status">
        <p
          className="status"
          data-testid={ `${testidPrefix}element-delivery-status-${id}` }
        >
          {status}
        </p>
        <p
          className="date"
          data-testid={ `${testidPrefix}element-order-date-${id}` }
        >
          {properDate}
        </p>
        <p
          className="price"
          data-testid={ `${testidPrefix}element-card-price-${id}` }
        >
          {totalPrice.replace('.', ',')}
        </p>
      </div>
      <div
        className="address_container"
      >
        {hasAddress && (
          <p
            className="address"
            data-testid={ `${testidPrefix}element-card-address-${id}` }
          >
            {`${deliveryAddress}, ${deliveryNumber}`}
          </p>
        )}
      </div>
    </button>
  );
}

CardOrder.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  hasAddress: PropTypes.bool,
  testidPrefix: PropTypes.string.isRequired,
  pushUrl: PropTypes.string.isRequired,
};

CardOrder.defaultProps = {
  hasAddress: false,
};

export default CardOrder;
