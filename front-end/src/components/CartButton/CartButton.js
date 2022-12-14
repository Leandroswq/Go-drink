import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import styles from './CartButton.module.css';

function CartButton() {
  const { cartList, cartTotalPrice } = useContext(CartContext);
  const history = useHistory();

  return (

    <button
      type="button"
      onClick={ () => { history.push('checkout'); } }
      className={ styles.cart_button }
      data-testid="customer_products__button-cart"
      disabled={ (cartList.length < 1 || !cartList) }
    >
      Ver carrinho
      <br />
      <span
        className={ styles.curency }
      >
        R$
      </span>
      <span
        className={ styles.checkout_value }
        data-testid="customer_products__checkout-bottom-value"
      >
        {cartTotalPrice().replace('.', ',')}

      </span>

    </button>
  );
}

export default CartButton;
