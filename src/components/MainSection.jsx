import React, { useEffect, useState, useRef } from "react";

function MainSection({
  workTime,
  breakTime,
  longBreakTime,
  onOpenSettings,
  onPomodoroComplete,
}) {
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [tomatoCount, setTomatoCount] = useState(0);
  const [duration, setDuration] = useState(workTime);
  const [modeClass, setModeClass] = useState("");
  const [textContent, setTextContent] = useState("Начнём?");
  const [endTime, setEndTime] = useState(null);
  const pomodoroCountedRef = useRef(false);
  useEffect(() => {
    setTimeLeft(workTime);
    setDuration(workTime);
    setIsBreak(false);
    setTomatoCount(0);
    setModeClass("");
    setTextContent("Начнём?");
    setIsRunning(false);
    setEndTime(null);
    pomodoroCountedRef.current = false;
  }, [workTime, breakTime, longBreakTime]);

  function switchMode() {
    const currentIsBreak = isBreak;
    const newIsBreak = !currentIsBreak;
    setIsBreak(newIsBreak);
    if (newIsBreak) {
      const newTomatoCount = tomatoCount + 1;
      setTomatoCount(newTomatoCount);
      if (newTomatoCount < 3) {
        setDuration(breakTime);
        setTimeLeft(breakTime);
        setModeClass("is-break");
        setTextContent("Пора сделать перерыв!");
      } else {
        setDuration(longBreakTime);
        setTimeLeft(longBreakTime);
        setTomatoCount(0);
        setModeClass("is-long-break");
        setTextContent("Пора сделать длинный перерыв!");
      }
    } else {
      pomodoroCountedRef.current = false;
      setDuration(workTime);
      setTimeLeft(workTime);
      setModeClass("");
      setTextContent("Пора за работу!");
    }
    setEndTime(null);
  }

  function formatTime(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? `0` + seconds : seconds}`;
  }
  function handleStart() {
    pomodoroCountedRef.current = false;
    setEndTime(Date.now() + duration * 1000);
    setIsRunning(true);
  }
  function handleStop() {
    if (isRunning) {
      setEndTime(Date.now() + duration * 1000);
    }
    setIsRunning(false);
  }
  function handleReset() {
    pomodoroCountedRef.current = false;
    setIsRunning(false);
    setTimeLeft(workTime);
    setDuration(workTime);
    setIsBreak(false);
    setTomatoCount(0);
    setModeClass("");
    setTextContent("Начнём?");
    setEndTime(null);
  }
  function handleSkip() {
    if (isRunning) {
      setIsRunning(false);
      switchMode();
    } else {
      switchMode();
    }
    setEndTime(null);
  }
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          if (!pomodoroCountedRef.current) {
            onPomodoroComplete();
            pomodoroCountedRef.current = true;
          }
          switchMode();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [isRunning]);

  useEffect(() => {
    let state = {
      endTime: isRunning ? endTime : null,
      isBreak,
      isRunning,
      duration,
      tomatoCount,
      timeLeft,
    };
    localStorage.setItem("pomodoro", JSON.stringify(state));
  }, [isRunning, timeLeft, tomatoCount, isBreak, duration, endTime]);

  useEffect(() => {
    const saved = localStorage.getItem("pomodoro");
    if (saved) {
      const state = JSON.parse(saved);
      setEndTime(state.endTime);
      setIsBreak(state.isBreak);
      setIsRunning(state.isRunning);
      setDuration(state.duration);
      setTomatoCount(state.tomatoCount);
      if (state.isBreak) {
        if (state.tomatoCount < 3) {
          setModeClass("is-break");
          setTextContent("Пора сделать перерыв!");
        } else {
          setModeClass("is-long-break");
          setTextContent("Пора сделать длинный перерыв!");
        }
      } else {
        setModeClass("");
        setTextContent("Пора за работу!");
      }
      if (state.isRunning && state.endTime > Date.now()) {
        let remainingSeconds = Math.floor((state.endTime - Date.now()) / 1000);
        setTimeLeft(remainingSeconds);
      } else if (
        state.isRunning &&
        state.endTime !== null &&
        state.endTime <= Date.now()
      ) {
        if (!pomodoroCountedRef.current) {
          onPomodoroComplete();
          pomodoroCountedRef.current = true;
        }
        switchMode();
      } else {
        setTimeLeft(state.timeLeft);
      }
    }
  }, []);
  // Сохранение: эффект следит за [isRunning, timeLeft, tomatoCount, isBreak, duration, endTime]
  // Восстановление: эффект с [] -> читаем localStorage -> сеттеры -> развилка:
  //   - если isRunning && endTime > Date.now() -> setTimeLeft(остаток)
  //   - если isRunning && endTime <= Date.now() -> switchMode()
  //   - иначе -> setTimeLeft(state.timeLeft)
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
