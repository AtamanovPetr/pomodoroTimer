import React from "react";

function Advantages() {
  return (
    <section className="advantages section">
      <div className="container">
        <h2>Преимущества</h2>
        <div className="cards">
          <div className="advantage-card" data-aos="zoom-in" data-aos-delay="0">
            <h3>Ритмичная продуктивность</h3>
            <p>
              25 минут полного погружения, затем короткий перерыв. Таймер
              считает помидоры и автоматически предлагает ритм, который держит
              мозг в тонусе.
            </p>
          </div>
          <div
            className="advantage-card"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <h3>Умный отдых</h3>
            <p>
              После четырёх циклов включается длинный перерыв — 20 минут на
              настоящее восстановление. Никакой усталости и выгорания.
            </p>
          </div>
          <div
            className="advantage-card"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <h3>Дизайн как ритуал</h3>
            <p>
              Стеклянная 3D-карточка, тёмная тема и живое свечение превращают
              работу в красивый ритуал. Прогресс сохраняется, даже если закрыть
              вкладку.
            </p>
          </div>
        </div>
      </div>
      <img
        data-aos="fade-down"
        src="/img/bulb.png"
        alt="Bulb"
        className="decor-img decor-img--bulb"
      />
    </section>
  );
}

export default Advantages;
