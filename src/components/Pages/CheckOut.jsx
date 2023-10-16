// @ts-nocheck
import React, { useEffect, useState } from "react";
import Style from "./CheckOut.module.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CheckOutProductCard from "../Cards/CheckOutProductCard";
import AddCardIcon from "@mui/icons-material/AddCard";
import AccountBalanceTwoToneIcon from "@mui/icons-material/AccountBalanceTwoTone";

const CheckOut = () => {
  const [cartList, SetCartList] = useState("");
  const [allData, setAllData] = useState({});
  const [cardNumber, setCardNumber] = useState("");
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const UserLocation = localStorage.getItem("locationDetails");
  const parseUserLocation = JSON.parse(UserLocation);
  const getAllProduct = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "z9qnjrap5ytl",
            "Content-Type": "application/json",
          },
        }
      );
      const parseData = await responce.json();
      // console.log(parseData.data);
      if (responce.status >= 400) {
        console.log(parseData.message || "Product not Found");
        return;
      }
      SetCartList(parseData?.data?.items);
      // console.log(parseData?.data?.items);
      setAllData(parseData);
      console.log(parseData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  const MaltipalProductPaynow = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/order/convertCartToOrder`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "z9qnjrap5ytl",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addressType: "HOME",
            address: {
              street: "123 Main St",
              city: "Anytown",
              state: "CA",
              country: "USA",
              zipCode: "12345",
            },
          }),
        }
      );
      const data = await responce.json();
      console.log(data);
      if (responce.status >= 400) {
        alert(data.message);
        return;
      } else {
        SetCartList("");
        alert("Order placed Successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={Style.ContentWrraper}>
      <div className={Style.leftSection}>
        <div className={Style.totalPay}>
          <div className={Style.PaybleAmount}>
            Payable amount: <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
            {allData?.data?.totalPrice}.00
          </div>
        </div>
        <div className={Style.cardScreen}>
          <div className={Style.Heading}>Payment</div>
          <div className={Style.PaymentContainer}>
            <div className={Style.PaymentOption}>
              <div className={Style.creditOption}>
                <AddCardIcon style={{ color: "aqua" }} />
                Credit/Debit Cards
              </div>
              <div className={Style.creditOptions}>
                <span>%</span>
                Pay in EMI
              </div>
              <div className={Style.creditOptions}>
                <AccountBalanceTwoToneIcon style={{ color: "aqua" }} />
                NetBanking
              </div>
            </div>
            <div className={Style.paymentOptionDetails}>
              <div className={Style.optionHeading}>
                Enter Debit/ Credit Card Details
              </div>
              <form className={Style.CardContainer}>
                <div>Card Number</div>
                <input
                  className={Style.CardNumber}
                  placeholder="Enter card number here"
                  required
                  onChange={setCardNumber}
                />
                <div className={Style.CardDetails}>
                  <div>
                    <label>Expiry</label>
                    <input
                      className={Style.detailInput}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label>CVV</label>
                    <input
                      className={Style.detailInput}
                      placeholder="CVV"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className={Style.PlaceOrderButton}
                  onClick={MaltipalProductPaynow}
                >
                  Place Order & Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.rightSection}>
        <div className={Style.orderDetails}>
          <div className={Style.OrderSummary}>
            <h3>Order Summary</h3>
            <div>
              {cartList &&
                cartList?.map((product, index) => (
                  <CheckOutProductCard
                    product={product}
                    key={index}
                    SetCartList={SetCartList}
                  />
                ))}
            </div>
            <div>
              <div className={Style.addressHeading}>
                Shipping Address <span className={Style.AddressType}>Home</span>
              </div>
              <div className={Style.address}>
                {parseUserLocation?.Address}
                {parseUserLocation?.State}
                {parseUserLocation?.Pincode}
              </div>
            </div>
          </div>
          <div className={Style.AmountDetails}>
            <div className={Style.Detail}>
              <h4>Amount Payable</h4>
              <div className={Style.Price}>
                <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
                {allData?.data?.totalPrice}.00
              </div>
            </div>
            <div className={Style.Detail}>
              <h4>Delivery charges</h4>
              <div>Free</div>
            </div>
            <hr></hr>
            <div className={Style.Detail}>
              <h4>Net Amount</h4>
              <div className={Style.Price}>
                <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
                {allData?.data?.totalPrice}.00
              </div>
            </div>
          </div>
        </div>
        <div>
          Instant discount offers on Apple, Oneplus and Samsung mobiles and
          devices will be applied on the verification page (OTP)
        </div>
        <div>
          By placing the order you have read & agreed to{" "}
          <a href="#">Terms and Conditions</a>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
