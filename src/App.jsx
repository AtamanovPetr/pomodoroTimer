import "./style.css";
import HowItWorks from "./components/HowItWorks";
import MainSection from "./components/MainSection";
import Advantages from "./components/Advantages";
import Feedback from "./components/Feedback";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Statistics from "./components/Statistics";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  const [workTime, setWorkTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [longBreakTime, setLongBreakTime] = useState(20 * 60);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [completedTomatoes, setCompletedTomatoes] = useState([]);
  const [settingsVersion, setSettingsVersion] = useState(0);
  useEffect(() => {
    if (completedTomatoes.length > 0) {
      localStorage.setItem(
        "completedTomatoes",
        JSON.stringify(completedTomatoes),
      );
    }
  }, [completedTomatoes]);
  useEffect(() => {
    const saved = localStorage.getItem("completedTomatoes");
    if (saved) {
      setCompletedTomatoes(JSON.parse(saved));
    }
  }, []);
  function handlePomodoroComplete() {
    const today = new Date().toISOString().slice(0, 10);
    setCompletedTomatoes((prev) => [...prev, today]);
  }
  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIsOpen]);
  return (
    <div>
      <MainSection
        onOpenSettings={() => setModalIsOpen(true)}
        workTime={workTime}
        breakTime={breakTime}
        longBreakTime={longBreakTime}
        onPomodoroComplete={handlePomodoroComplete}
        settingsVersion={settingsVersion}
      />
      <Statistics data={completedTomatoes} />
      <HowItWorks />
      <Advantages />
      <Feedback />
      <Footer />
      {modalIsOpen && (
        <Modal
          onClose={() => setModalIsOpen(false)}
          onSave={(work, br, long) => {
            setWorkTime(work);
            setBreakTime(br);
            setLongBreakTime(long);
            setModalIsOpen(false);
            setSettingsVersion((prev) => prev + 1);
          }}
        />
      )}
    </div>
  );
}

export default App;
