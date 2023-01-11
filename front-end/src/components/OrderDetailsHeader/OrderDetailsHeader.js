import PropTypes from 'prop-types';
import ordersRequest from '../../services/requests/ordersRequest';
import saleStatus from '../../services/status/saleStatus';

import styles from './OrderDetailsHeader.module.css';

function OrderDetailsHeader({
  id,
  seller,
  date,
  status,
  testidPrefix,
  isUser,
  updateStatus,
  page,
}) {
  async function handleCLickDeliveryCheck() {
    await ordersRequest.updateStatus(id, saleStatus.entregue);
    updateStatus();
  }

  async function handleCLickPreparingCheck() {
    await ordersRequest.updateStatus(id, saleStatus.preparando);
    updateStatus();
  }

  async function handleCLickDispatchCheck() {
    await ordersRequest.updateStatus(id, saleStatus.emTransito);
    updateStatus();
  }
  return (
    <div className={ `${styles.order_details} ${styles[page]}` }>
      <p
        className={ styles.order_number }
        data-testid={ `${testidPrefix}element-order-details-label-order-id` }
      >
        {`Pedido ${id}`}

      </p>
      {
        isUser && (
          <p
            className={ styles.seller_name }
            data-testid={ `${testidPrefix}element-order-details-label-seller-name` }
          >
            {seller}
          </p>
        )
      }
      <p
        data-testid={ `${testidPrefix}element-order-details-label-order-date` }
        className={ styles.order_data }
      >
        {new Date(date)
          .toLocaleDateString('pt-BR', {
            timeZone: 'UTC',
          })}
      </p>
      <p
        className={ `${styles.status} ${styles[status.replace(' ', '')]}` }
        data-testid={ `${testidPrefix}element-order-details-label-delivery-status` }
      >
        {status}
      </p>
      {
        isUser ? (
          <div
            className={
              `
                  ${styles.slider_delivered_checkbox_container}
                  ${styles[status.replace(' ', '')]}
                `
            }
          >
            <label
              htmlFor="delivered"
              className={
                `
                    ${styles.delivered_checkbox}
                    ${styles[status.replace(' ', '')]}
                  `
              }
            >
              <span
                className={ styles.delivered_checkbox_text }
              >
                Marcar como entregue
              </span>
              <input
                className={ styles.delivered_input }
                type="checkbox"
                value="None"
                checked={ status === 'Entregue' }
                id="delivered"
                name="check"
                onClick={ handleCLickDeliveryCheck }
                disabled={ status !== 'Em Trânsito' }
              />
              <span
                className={ styles.delivered_slider_item }
              />
            </label>
          </div>
        ) : (
          <>
            <button
              className={ styles.button_preparing_check }
              data-testid={ `${testidPrefix}button-preparing-check` }
              type="button"
              onClick={ handleCLickPreparingCheck }
              disabled={ status !== 'Pendente' }
            >
              Preparar pedido
            </button>
            <button
              className={ styles.button_dispatch_check }
              type="button"
              data-testid={ `${testidPrefix}button-dispatch-check` }
              onClick={ handleCLickDispatchCheck }
              disabled={ status !== 'Preparando' }
            >
              Saiu para entrega
            </button>
          </>
        )
      }

    </div>
  );
}

OrderDetailsHeader.propTypes = {
  id: PropTypes.number.isRequired,
  seller: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  testidPrefix: PropTypes.string.isRequired,
  isUser: PropTypes.bool,
  updateStatus: PropTypes.func.isRequired,
  page: PropTypes.string,
};

OrderDetailsHeader.defaultProps = {
  isUser: false,
  page: '',
};

export default OrderDetailsHeader;
