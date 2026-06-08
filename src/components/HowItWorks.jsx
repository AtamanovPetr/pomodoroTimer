import React from "react";
function HowItWorks() {
  return (
    <section className="how-it-works section">
      <div className="container">
        <h2>Как это работает</h2>
        <div className="steps">
          <div className="step" data-aos="fade-right">
            <span className="step-icon">🍅</span>
            <h3>Выбери задачу</h3>
            <p>Реши, над чем будешь работать.</p>
          </div>
          <div className="step" data-aos="fade-up" data-aos-delay="200">
            <span className="step-icon">⏳</span>
            <h3>Запусти таймер</h3>
            <p>25 минут концентрации без отвлечений.</p>
          </div>
          <div className="step" data-aos="fade-left" data-aos-delay="400">
            <span className="step-icon">☕</span>
            <h3>Сделай перерыв</h3>
            <p>Короткий отдых для перезагрузки.</p>
          </div>
        </div>
      </div>
      <img
        data-aos="fade-down"
        src="/img/brain.png"
        alt="Brain"
        className="decor-img decor-img--brain"
      />
    </section>
  );
}

export default HowItWorks;
