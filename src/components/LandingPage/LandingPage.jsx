import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const handlePlayClick = () => {
        navigate('/game');
    };

    return (
        <div className="landing-container">
            <div className="landing-content">
                <h1 className="game-title">TRUTRU</h1>
                <p className="game-subtitle">El Truco Argentino Definitivo</p>

                <div className="rank-display">
                    <div className="rank-card">
                        <span className="rank-label">TU RANGO</span>
                        <h2 className="rank-title">Novato</h2>
                        <div className="rank-progress-bar">
                            <div className="rank-progress" style={{ width: '30%' }}></div>
                        </div>
                        <p className="rank-xp">300 / 1000 XP</p>
                    </div>
                </div>

                <div className="mode-selection">
                    <h3 className="mode-title">Selecciona tu Modo</h3>
                    <div className="cards-container">
                        <div className="mode-card" onClick={handlePlayClick}>
                            <div className="card-face">
                                <span className="mode-number">1vs1</span>
                                <span className="mode-desc">Duelo Rápido</span>
                            </div>
                        </div>
                        <div className="mode-card" onClick={handlePlayClick}>
                            <div className="card-face">
                                <span className="mode-number">2vs2</span>
                                <span className="mode-desc">En Pareja</span>
                            </div>
                        </div>
                        <div className="mode-card" onClick={handlePlayClick}>
                            <div className="card-face">
                                <span className="mode-number">3vs3</span>
                                <span className="mode-desc">Pica Pica</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="play-button" onClick={handlePlayClick}>
                    JUGAR AHORA
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
