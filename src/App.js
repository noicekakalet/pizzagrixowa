import React, { useState, useEffect } from 'react';
import './App.css';
import Receipt from './Receipt';
import sadAnimeImage from '@images/sad-anime.jpg';

const App = () => {
    const [pizzaType, setPizzaType] = useState('');
    const [customIngredients, setCustomIngredients] = useState([]);
    const [address, setAddress] = useState('Ostrow Wielkopolski Pedalska 27');
    const [showReceipt, setShowReceipt] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [gayMode, setGayMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const basePizzaTypes = [
        { id: 'napletanska', name: 'Pizza Napletańska', description: 'Naplety z sosem spermowym' },
        { id: 'crashowa', name: 'Pizza Crashowa', description: 'Rakiety z 1.01x oraz sos stake.com' },
        { id: 'custom', name: 'Pizza Własna', description: 'Skomponuj swoją pizzę' }
    ];

    const baseIngredients = [
        { id: 'ser', name: 'Ser', image: '🧀' },
        { id: 'salami', name: 'Salami', image: '🍖' },
        { id: 'pieczarki', name: 'Pieczarki', image: '🍄' },
        { id: 'papryka', name: 'Papryka', image: '🌶️' },
        { id: 'cebula', name: 'Cebula', image: '🧅' },
        { id: 'pomidor', name: 'Pomidor', image: '🍅' },
        { id: 'oliwki', name: 'Oliwki', image: '🫒' },
        { id: 'naplety', name: 'Naplety', image: '🍆', special: true },
        { id: 'sperma', name: 'Sos Spermowy', image: '💦', special: true },
        { id: 'rakiety', name: 'Rakiety 1.01x', image: '🚀', special: true },
        { id: 'stake', name: 'Sos Stake.com', image: '🎰', special: true },
        { id: 'kasyno', name: 'Kasyno', image: '🎲', special: true },
        { id: 'robuxy', name: 'Robuxy', image: '💰', special: true },
        { id: 'iphone', name: 'iPhone', image: '📱', special: true }
    ];

    const gayModeExtras = {
        pizzaTypes: [
            { id: 'lexiakowa', name: 'Pizza Lexiakowa 🏳️‍🌈', description: 'Yapping, Dice, Gambling i Blokady', special: true }
        ],
        ingredients: [
            { id: 'yapping', name: 'Yapping', image: '🗣️', special: true },
            { id: 'dice', name: 'Dice', image: '🎲', special: true },
            { id: 'gambling', name: 'Gambling', image: '🎰', special: true },
            { id: 'blokady', name: 'Blokady', image: '🚫', special: true }
        ]
    };

    const pizzaTypes = gayMode ? [...basePizzaTypes, ...gayModeExtras.pizzaTypes] : basePizzaTypes;
    const ingredients = gayMode ? [...baseIngredients, ...gayModeExtras.ingredients] : baseIngredients;

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedPizza = pizzaTypes.find(p => p.id === pizzaType);
        const selectedIngredients = pizzaType === 'custom' 
            ? customIngredients.map(id => ingredients.find(ing => ing.id === id).name)
            : [];
        
        setOrderDetails({
            pizzaType,
            pizzaName: selectedPizza.name,
            ingredients: selectedIngredients
        });
        setShowReceipt(true);
    };

    const activateGayMode = () => {
        setGayMode(true);
        setShowModal(true);
        document.body.classList.add('gay-mode-active');
        setTimeout(() => setShowModal(false), 3000);
        // Reset pizza selection if Lexiakowa was selected
        if (pizzaType === 'lexiakowa') {
            setPizzaType('');
        }
        // Remove gay mode ingredients from custom selection
        setCustomIngredients(prev => 
            prev.filter(id => !gayModeExtras.ingredients.some(ing => ing.id === id))
        );
    };

    const renderPizzaPreview = () => {
        if (!pizzaType) return null;

        return (
            <div className="pizza-preview">
                <div className="pizza-base">
                    <div className="pizza-toppings">
                        {pizzaType === 'napletanska' && (
                            <div className="special-pizza napletanska">
                                <span className="topping">🍆</span>
                                <span className="topping">💦</span>
                            </div>
                        )}
                        {pizzaType === 'crashowa' && (
                            <div className="special-pizza crashowa">
                                <span className="topping">🚀</span>
                                <span className="topping">🎰</span>
                            </div>
                        )}
                        {pizzaType === 'lexiakowa' && (
                            <div className="special-pizza lexiakowa">
                                <span className="topping">🗣️</span>
                                <span className="topping">🎲</span>
                                <span className="topping">🎰</span>
                                <span className="topping">🚫</span>
                                <span className="topping">🏳️‍🌈</span>
                            </div>
                        )}
                        {pizzaType === 'custom' && customIngredients.map(id => {
                            const ingredient = ingredients.find(ing => ing.id === id);
                            return (
                                <span key={id} className="topping">
                                    {ingredient.image}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    // Jeśli tryb pedalski jest wyłączony, a wybrana była pizza Lexiakowa, resetujemy wybór
    useEffect(() => {
        if (!gayMode && pizzaType === 'lexiakowa') {
            setPizzaType('');
        }
    }, [gayMode]);

    return (
        <div className={`app ${gayMode ? 'gay-mode-active' : ''}`}>
            <header>
                <h1 className={gayMode ? 'gay-mode-text' : ''} data-text="Pizza dla Grixa">
                    Pizza dla Grixa
                </h1>
                <img 
                    src={sadAnimeImage} 
                    alt="Sad Anime" 
                    style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                />
            </header>
            
            <form onSubmit={handleSubmit} className="pizza-form">
                <div className="form-group">
                    <label>Wybierz rodzaj pizzy:</label>
                    <select 
                        value={pizzaType} 
                        onChange={(e) => setPizzaType(e.target.value)}
                        className={pizzaType === 'lexiakowa' ? 'gay-mode-text' : ''}
                    >
                        <option value="">Wybierz pizzę</option>
                        {pizzaTypes.map(type => (
                            <option 
                                key={type.id} 
                                value={type.id} 
                                className={type.special ? 'gay-mode-text' : ''}
                                data-text={`${type.name} - ${type.description}`}
                            >
                                {type.name} - {type.description}
                            </option>
                        ))}
                    </select>
                </div>

                {renderPizzaPreview()}

                {pizzaType === 'custom' && (
                    <div className="form-group">
                        <label>Wybierz składniki:</label>
                        <div className="ingredients-grid">
                            {ingredients.map(ingredient => (
                                <div key={ingredient.id} className={`ingredient-checkbox ${ingredient.special ? 'special-ingredient' : ''}`}>
                                    <input
                                        type="checkbox"
                                        id={ingredient.id}
                                        checked={customIngredients.includes(ingredient.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setCustomIngredients([...customIngredients, ingredient.id]);
                                            } else {
                                                setCustomIngredients(customIngredients.filter(id => id !== ingredient.id));
                                            }
                                        }}
                                    />
                                    <label htmlFor={ingredient.id}>
                                        <span className="ingredient-emoji">{ingredient.image}</span>
                                        {ingredient.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <label>Adres dostawy:</label>
                    <input type="text" value={address} readOnly />
                </div>

                <button type="submit" className="order-button">
                    Zamów pizzę dla Grixa
                </button>
            </form>

            <button onClick={activateGayMode} className="easter-egg-button">
                <img src={sadAnimeImage} alt="Easter Egg" />
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="gay-mode-text" data-text="Uruchomiono tryb pedalski! 🏳️‍🌈">
                            Uruchomiono tryb pedalski! 🏳️‍🌈
                        </h2>
                        <p>Dostępna nowa pizza: Lexiakowa!</p>
                    </div>
                </div>
            )}

            <Receipt 
                isOpen={showReceipt} 
                onClose={() => setShowReceipt(false)} 
                orderDetails={orderDetails}
            />
        </div>
    );
};

export default App; 