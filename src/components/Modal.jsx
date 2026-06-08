import React, { useRef } from "react";

function Modal({ onClose, onSave }) {
  const workRef = useRef(null);
  const breakRef = useRef(null);
  const longBreakRef = useRef(null);

  function handleSave() {
    const w = parseInt(workRef.current.value, 10) || 0;
    const b = parseInt(breakRef.current.value, 10) || 0;
    const lb = parseInt(longBreakRef.current.value, 10) || 0;
    onSave(w * 60, b * 60, lb * 60);
  }
  return (
    <div className="overlay" id="overlay" onClick={onClose}>
      <div className="modal" id="modal" onClick={(e) => e.stopPropagation()}>
        <div className="exit-btn" id="exitbtn" onClick={onClose}>
          x
        </div>
        <div className="modal-wrapper">
          <h1 className="modal-title">Настройки таймера</h1>
          <div className="modal-input-group">
            <label htmlFor="work-duration">Работа (мин)</label>
            <input
              ref={workRef}
              type="number"
              className="modal-input"
              defaultValue="25"
              min="1"
              max="60"
            />
          </div>
          <div className="modal-input-group">
            <label htmlFor="break-duration">Короткий перерыв (мин)</label>
            <input
              ref={breakRef}
              type="number"
              className="modal-input"
              defaultValue="5"
              min="1"
              max="30"
            />
          </div>
          <div className="modal-input-group">
            <label htmlFor="long-break-duration">Длинный перерыв (мин)</label>
            <input
              ref={longBreakRef}
              type="number"
              className="modal-input"
              defaultValue="20"
              min="1"
              max="60"
            />
          </div>
          <button
            id="save-settings-btn"
            type="button"
            className="button submit"
            onClick={handleSave}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
