import React from 'react';
import './Receipt.css';

const Receipt = ({ isOpen, onClose, orderDetails }) => {
    if (!isOpen) return null;

    const currentDate = new Date().toLocaleString('pl-PL');
    const orderNumber = Math.floor(Math.random() * 1000000);

    const calculateTotal = () => {
        let total = 0;
        if (orderDetails.pizzaType === 'napletanska' || orderDetails.pizzaType === 'crashowa') {
            total = 69.99;
        } else if (orderDetails.pizzaType === 'lexiakowa') {
            total = 88.99;
        } else if (orderDetails.pizzaType === 'custom') {
            total = 29.99; // Cena podstawowa
            total += orderDetails.ingredients.length * 5.99; // 5.99 zł za każdy składnik
        }
        return total.toFixed(2);
    };

    const getPizzaName = (type) => {
        switch(type) {
            case 'napletanska':
                return 'Pizza Napletańska';
            case 'crashowa':
                return 'Pizza Crashowa';
            case 'lexiakowa':
                return 'Pizza Lexiakowa 🏳️‍🌈';
            case 'custom':
                return 'Pizza Własna';
            default:
                return 'Pizza';
        }
    };

    const getPizzaPrice = (type) => {
        switch(type) {
            case 'napletanska':
            case 'crashowa':
                return '69.99 zł';
            case 'lexiakowa':
                return '88.99 zł';
            case 'custom':
                return '29.99 zł';
            default:
                return '0.00 zł';
        }
    };

    return (
        <div className="receipt-overlay">
            <div className="receipt">
                <div className="receipt-header">
                    <h2>Pizza dla Grixa</h2>
                    <p>ul. Pedalska 27</p>
                    <p>Ostrów Wielkopolski</p>
                </div>
                
                <div className="receipt-content">
                    <div className="receipt-info">
                        <p>Data: {currentDate}</p>
                        <p>Nr zamówienia: #{orderNumber}</p>
                        <p>Klient: Igor Kasprzak</p>
                    </div>

                    <div className="receipt-items">
                        <h3>Zamówienie:</h3>
                        {orderDetails.pizzaType !== 'custom' ? (
                            <div className={`receipt-item ${orderDetails.pizzaType === 'lexiakowa' ? 'gay-mode-text' : ''}`}>
                                <span>{getPizzaName(orderDetails.pizzaType)}</span>
                                <span>{getPizzaPrice(orderDetails.pizzaType)}</span>
                            </div>
                        ) : (
                            <>
                                <div className="receipt-item">
                                    <span>Pizza Własna (baza)</span>
                                    <span>29.99 zł</span>
                                </div>
                                {orderDetails.ingredients.map((ingredient, index) => (
                                    <div key={index} className="receipt-item ingredient">
                                        <span>+ {ingredient}</span>
                                        <span>5.99 zł</span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    <div className="receipt-total">
                        <div className="total-line">
                            <span>Razem:</span>
                            <span>{calculateTotal()} zł</span>
                        </div>
                    </div>

                    <div className="receipt-footer">
                        <p>Dziękujemy za zamówienie!</p>
                        <p>Życzymy smacznego!</p>
                        <button onClick={onClose}>Zamknij</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Receipt; 