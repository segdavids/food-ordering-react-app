import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { useEffect } from "react";
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../../slice/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Cart = () =>{
    const cartItems = useSelector((state)=>state.cart.items); //Get cart items
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);
    const navigate = useNavigate();

    //calculate total items and price
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    //Checkout Functionality 
    const handleCheckout = () => {
      if(!isAuthenticated) {
        navigate("/login");
      }else{
        dispatch(clearCart());
        toast.success("Order Placed Successfully!!!",{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
      });
      setTimeout(()=> navigate("/"), 2600);
      }
    } 

    useEffect(()=>{
        console.log("Cart items updated:", cartItems);
    }, [cartItems]);

    return (
        <div className="cart-container">
          <ToastContainer/>
          <h2 className="cart-title">🛒 Shopping Cart</h2>
    
          {totalItems === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <div className="cart-content">
              {/* Cart Items List */}
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>₹{item.price}</p>
                    </div>
                    {/* Quantity Buttons */}
                    <div className="quantity-controls">
                      <button onClick={()=>dispatch(decreaseQuantity(item.id))}>➖</button>
                      <span>{item.quantity}</span>
                      <button onClick={()=>dispatch(increaseQuantity(item.id))}>➕</button>
                    </div>
                    <button
                      className="remove-button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      ❌ Remove
                    </button>
                  </div>
                ))}
              </div>
    
              {/* Summary Section */}
              <div className="cart-summary">
                <h3>Order Summary</h3>
                <p>Total Items: <strong>{totalItems}</strong></p>
                <p>Total Price: <strong>₹{totalPrice}</strong></p>
                <button className="clear-cart-button" onClick={() => dispatch(clearCart())}>
                  🗑️ Clear Cart
                </button>
                <button className="checkout-button" onClick={handleCheckout}>✅ Checkout</button>
              </div>
            </div>
          )}
        </div>
      );
    };
    
    export default Cart;