import React from 'react';


const ShowPaymentInfo = ({ order, showStatus= true }) => {
    return (
        
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <p><span><b>ORDER ID:</b> {" "}{" "}<i>{order.paymentIntent.id}</i> </span> {" "} <br /></p>

            <div>
                <p style={{textAlign: "left"}}>
                
                <span><b>Amount:</b> {"  "} 
                {(order.paymentIntent.amount /= 100).toLocaleString('en-US', {
                    style: 'currency', 
                    currency: 'USD',
                })}</span>{"  "} <br />
                <span><b>Currency:</b> {order.paymentIntent.currency.toUpperCase()}</span>{"  "}<br />
                <span><b>Method:</b> {order.paymentIntent.payment_method_types[0]}</span>{"  "} 
                </p>
            </div>
            <div>

                <p style={{textAlign: "left"}}>
                    <span><b>Payment:</b> {order.paymentIntent.status.toUpperCase()}</span>{" "} <br />
                    <span><b>Order On:</b>{" "} {new Date(order.paymentIntent.created * 1000).toLocaleString()}</span>{"  "}<br />
                    {showStatus && (<span className='badge bg-primary text-white'>
                        STATUS: {order.orderStatus}
                    </span>)}
                
                </p>
            </div>
        </div>
    )
}

export default ShowPaymentInfo
