import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "√") {
      setInput((prev) => (prev ? Math.sqrt(parseFloat(prev)).toString() : ""));
    } else if (value === "%") {
      setInput((prev) => (prev ? (parseFloat(prev) / 100).toString() : ""));
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleClear = () => setInput("");

  const handleBackspace = () => setInput((prev) => prev.slice(0, -1));

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (/\d|\.|\+|\-|\*|\//.test(key)) {
      handleClick(key);
    } else if (key === "Enter") {
      handleCalculate();
    } else if (key === "Backspace") {
      handleBackspace();
    } else if (key === "Escape") {
      handleClear();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="vh-100  d-flex flex-column align-items-center justify-content-center">
      <div className="card p-4 shadow-lg" style={{ width: "320px" }}>
        <input
          type="text"
          value={input}
          className="form-control text-end fs-3 mb-3"
          readOnly
        />
        <div className="d-flex flex-column gap-2">
          {[
            ["7", "8", "9", "/"],
            ["4", "5", "6", "*"],
            ["1", "2", "3", "-"],
            ["0", ".", "=", "+"],
            ["%", "√", "⌫", "C"],
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="d-flex gap-2">
              {row.map((char, index) => (
                <button
                  key={index}
                  onClick={() =>
                    char === "="
                      ? handleCalculate()
                      : char === "⌫"
                      ? handleBackspace()
                      : char === "C"
                      ? handleClear()
                      : handleClick(char)
                  }
                  className={`btn ${
                    char === "="
                      ? "btn-success"
                      : char === "C"
                      ? "btn-danger"
                      : char === "⌫"
                      ? "btn-warning"
                      : "btn-secondary"
                  } flex-grow-1 fs-4`}
                >
                  {char}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
