import React from "react";
function Feedback() {
  return (
    <section className="testimonials section">
      <img
        data-aos="fade-down"
        src="/img/saturn.png"
        alt="Saturn"
        className="decor-img decor-img--saturn"
      />
      <div className="container">
        <h2>Отзывы</h2>
        <div className="reviews">
          <div className="review-card" data-aos="fade-up-right">
            <p className="review-text">
              «Этот Pomodoro таймер спас мою продуктивность. Теперь я успеваю в
              два раза больше и не выгораю к вечеру.»
            </p>
            <div className="review-author">
              <img
                src="https://i.pravatar.cc/60?img=11"
                alt="Аватар"
                className="review-avatar"
              />
              <div>
                <strong>Анна М.</strong>
                <span>Фрилансер</span>
              </div>
            </div>
          </div>
          <div className="review-card" data-aos="fade-up" data-aos-delay="200">
            <p className="review-text">
              «Стеклянный дизайн и плавные анимации создают ощущение
              премиального инструмента. Пользуюсь каждый день.»
            </p>
            <div className="review-author">
              <img
                src="https://i.pravatar.cc/60?img=12"
                alt="Аватар"
                className="review-avatar"
              />
              <div>
                <strong>Игорь П.</strong>
                <span>Дизайнер</span>
              </div>
            </div>
          </div>
          <div
            className="review-card"
            data-aos="fade-up-left"
            data-aos-delay="400"
          >
            <p className="review-text">
              «Раньше думал, что Pomodoro — не для меня. Теперь это мой ритуал:
              запускаю таймер и полностью погружаюсь в код.»
            </p>
            <div className="review-author">
              <img
                src="https://i.pravatar.cc/60?img=13"
                alt="Аватар"
                className="review-avatar"
              />
              <div>
                <strong>Елена С.</strong>
                <span>Разработчик</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feedback;
