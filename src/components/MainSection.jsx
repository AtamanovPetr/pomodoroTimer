import React, { useEffect, useState, useRef } from "react";

function MainSection({
  workTime,
  breakTime,
  longBreakTime,
  onOpenSettings,
  onPomodoroComplete,
  settingsVersion,
}) {
  // Только для отображения на экране
  const [timeLeft, setTimeLeft] = useState(workTime);

  // Все рабочие переменные как refs (не вызывают ререндер)
  const timerId = useRef(null);
  const endTime = useRef(null);
  const duration = useRef(workTime);
  const isBreak = useRef(false);
  const isRunning = useRef(false);
  const timeOutId = useRef(null);
  const tomatoCount = useRef(0);
  const pausedTimeLeft = useRef(null);
  const pomodoroCountedRef = useRef(false);

  // === Функции как в оригинале ===
  function updateTime(secs) {
    setTimeLeft(secs);
    // Можно обновлять title страницы через document.title, если нужно
  }

  function saveState() {
    const state = {
      endTime: isRunning.current ? endTime.current : null,
      isBreak: isBreak.current,
      isRunning: isRunning.current,
      duration: duration.current,
      tomatoCount: tomatoCount.current,
      timeLeft: timeLeft, // текущее отображаемое значение
    };
    localStorage.setItem("pomodoro", JSON.stringify(state));
  }

  function restoreState() {
    const saved = localStorage.getItem("pomodoro");
    if (!saved) {
      updateTime(workTime);
      return;
    }

    const state = JSON.parse(saved);
    endTime.current = state.endTime;
    isBreak.current = state.isBreak;
    isRunning.current = state.isRunning;
    duration.current = state.duration;
    tomatoCount.current = state.tomatoCount;

    if (isRunning.current && endTime.current > Date.now()) {
      const remainingSeconds = Math.floor(
        (endTime.current - Date.now()) / 1000,
      );
      updateTime(remainingSeconds);
      runTimer();
    } else if (
      isRunning.current &&
      endTime.current !== null &&
      endTime.current <= Date.now()
    ) {
      // Время вышло, пока страница была закрыта
      if (!pomodoroCountedRef.current) {
        onPomodoroComplete();
        pomodoroCountedRef.current = true;
      }
      switchMode();
      saveState();
    } else {
      updateTime(state.timeLeft);
    }

    updateInterfaceClasses();
  }

  function updateInterfaceClasses() {
    // Обновляем классы и текст в зависимости от isBreak и tomatoCount
    const cardLabel = document.getElementById("card-label");
    if (cardLabel) {
      if (isBreak.current) {
        if (tomatoCount.current < 3) {
          cardLabel.textContent = "Пора сделать перерыв!";
          document.body.classList.add("is-break");
        } else {
          cardLabel.textContent = "Пора сделать длинный перерыв!";
          document.body.classList.add("is-long-break");
        }
      } else {
        cardLabel.textContent = "Пора за работу!";
        document.body.classList.remove("is-break", "is-long-break");
      }
    }
  }

  function switchMode() {
    isBreak.current = !isBreak.current;
    if (isBreak.current) {
      tomatoCount.current++;
      if (tomatoCount.current < 3) {
        duration.current = breakTime;
        updateTime(breakTime);
        document.body.classList.remove("is-break", "is-long-break");
        document.body.classList.add("is-break");
        // Обновим текст (можно через состояние или напрямую)
        setTextContent("Пора сделать перерыв!");
        setModeClass("is-break");
      } else {
        duration.current = longBreakTime;
        updateTime(longBreakTime);
        tomatoCount.current = 0;
        document.body.classList.remove("is-break", "is-long-break");
        document.body.classList.add("is-long-break");
        setTextContent("Пора сделать длинный перерыв!");
        setModeClass("is-long-break");
      }
    } else {
      pomodoroCountedRef.current = false;
      duration.current = workTime;
      updateTime(workTime);
      document.body.classList.remove("is-break", "is-long-break");
      setTextContent("Пора за работу!");
      setModeClass("");
    }
    endTime.current = null;
    isRunning.current = false;
    saveState();
  }

  function runTimer() {
    if (timerId.current !== null) return;

    timerId.current = setInterval(() => {
      const remainingMs = endTime.current - Date.now();
      const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));
      updateTime(remainingSeconds);

      if (remainingSeconds <= 0) {
        clearInterval(timerId.current);
        timerId.current = null;
        isRunning.current = false;
        updateTime(0);

        if (timeOutId.current !== null) return;
        timeOutId.current = setTimeout(() => {
          timeOutId.current = null;
          if (!pomodoroCountedRef.current) {
            onPomodoroComplete();
            pomodoroCountedRef.current = true;
          }
          switchMode();
          saveState();
        }, 1000);
      }
    }, 300);
  }

  // === Обработчики кнопок ===
  function handleStart() {
    if (pausedTimeLeft.current > 0) {
      endTime.current = Date.now() + pausedTimeLeft.current * 1000;
      pausedTimeLeft.current = null;
    } else {
      endTime.current = Date.now() + duration.current * 1000;
    }
    isRunning.current = true;
    saveState();
    runTimer();
  }

  function handleStop() {
    if (isRunning.current) {
      const remainingMs = endTime.current - Date.now();
      pausedTimeLeft.current = Math.ceil(remainingMs / 1000);
      endTime.current = Date.now() + duration.current * 1000;
    }
    clearInterval(timerId.current);
    timerId.current = null;
    clearTimeout(timeOutId.current);
    timeOutId.current = null;
    isRunning.current = false;
    saveState();
  }

  function handleReset() {
    clearInterval(timerId.current);
    timerId.current = null;
    clearTimeout(timeOutId.current);
    timeOutId.current = null;
    isBreak.current = false;
    isRunning.current = false;
    duration.current = workTime;
    tomatoCount.current = 0;
    pausedTimeLeft.current = null;
    updateTime(workTime);
    document.body.classList.remove("is-break", "is-long-break");
    setTextContent("Начнём?");
    setModeClass("");
    endTime.current = null;
    pomodoroCountedRef.current = false;
    saveState();
  }

  function handleSkip() {
    clearInterval(timerId.current);
    timerId.current = null;
    clearTimeout(timeOutId.current);
    timeOutId.current = null;
    isRunning.current = false;
    pausedTimeLeft.current = null;
    switchMode();
    saveState();
  }

  // Для управления текстом и классами из React (чтобы не трогать DOM напрямую)
  const [modeClass, setModeClass] = useState("");
  const [textContent, setTextContent] = useState("Начнём?");

  useEffect(() => {
    restoreState();
  }, []);

  // Форматирование времени
  function formatTime(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  useEffect(() => {
    if (settingsVersion === 0) return; // пропускаем первый рендер
    // Сброс таймера на новые настройки
    clearInterval(timerId.current);
    timerId.current = null;
    clearTimeout(timeOutId.current);
    timeOutId.current = null;
    isRunning.current = false;
    isBreak.current = false;
    duration.current = workTime;
    tomatoCount.current = 0;
    pausedTimeLeft.current = null;
    endTime.current = null;
    pomodoroCountedRef.current = false;
    updateTime(workTime);
    setTextContent("Начнём?");
    setModeClass("");
    saveState();
  }, [settingsVersion]);
  return (
    <section className="main">
      <img
        data-aos="fade-down"
        src="/img/time.png"
        alt="Time"
        className="decor-img decor-img--time"
      />
      <div className="container">
        <button
          id="open-modal"
          className="button modal-btn"
          data-aos="fade-up"
          onClick={onOpenSettings}
        >
          Настроить время
        </button>
        <div className="card-wrapper" data-aos="fade-up" data-aos-delay="300">
          <div className={`card ${modeClass}`} id="pomodoro-card">
            <h1 id="card-label" className="card-title">
              {textContent}
            </h1>
            <div id="timer" className="time">
              {formatTime(timeLeft)}
            </div>
            <button className="button" id="start" onClick={handleStart}>
              Старт
            </button>
            <button className="button" id="stop" onClick={handleStop}>
              Стоп
            </button>
            <button className="button" id="reset" onClick={handleReset}>
              Сброс
            </button>
            <button className="button skip" id="skip-btn" onClick={handleSkip}>
              Пропустить перерыв
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainSection;
