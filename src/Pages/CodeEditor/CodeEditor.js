import React, { useEffect, useState } from "react";
import "./CodeEditor.css";
import Nav from "../../Components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import Tooltip from "../../Components/Tooltip/Tooltip";

const CodeEditor = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [selectedButton, setSelectedButton] = useState("HTML");

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  const [selectedText, setSelectedText] = useState("");

  const [output, setOutput] = useState("");

  const buttonTypes = ["HTML", "CSS", "JS"]; /* for header buttons - map */

  const handleButtonSelection = (buttonType) => {
    setSelectedButton(buttonType);
  };

  const navigate = useNavigate();

useEffect(() => {
  const combinedOutput = `
    <html>
      <head>
          <style>
            ${css}
        </style>
      </head>
      <body>
          ${html}
          <script>${js}</script>
      </body>
    </html>
  `;
  setOutput(combinedOutput);
  setIsSaved(false);
}, [html, css, js]);


  // --- Copy Button Function  ---
  const handleCopyClick = () => {
    if (selectedText) {
      navigator.clipboard
        .writeText(selectedText)
        .then(() => {
          console.log("Text copied to the clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  const handleTextSelect = (e, setText, text) => {
    const selected = text.substring(
      e.target.selectionStart,
      e.target.selectionEnd
    );
    setText(selected);
  };

  // --- Indentation Function ---
  const handleKeyDown = (e, setText, text) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const currentContent = text;

      const updatedContent =
        currentContent.substring(0, selectionStart) +
        "  " +
        currentContent.substring(selectionEnd);

      setText(updatedContent);

      const newSelectionStart = selectionStart + 2;
      e.target.setSelectionRange(newSelectionStart, newSelectionStart);

      e.persist();
    }
  };

  return (
    <div className="code-editor">
      <Nav userName={"Sahil"} />
      <div className="code-editor-wrapper">
        <div className="code-container">
          <div className="code-container-header">
            <div className="code-container-header-left">
              {buttonTypes.map((buttonType) => (
                <button
                  key={buttonType}
                  className={`cur-po code-buttons ${
                    selectedButton === buttonType ? "active" : ""
                  }`}
                  onClick={() => handleButtonSelection(buttonType)}
                >
                  {buttonType}
                </button>
              ))}

              <Tooltip text={"Copy"}>
                <button
                  className="cur-po code-buttons"
                  onClick={handleCopyClick}
                >
                  <i className="fa-solid fa-copy"></i>
                </button>
              </Tooltip>
              <Tooltip text={isSaved ? "Saved" : "Save"}>
                <button
                  className="cur-po code-buttons"
                  onClick={() =>
                    isSaved ? setIsSaved(false) : setIsSaved(true)
                  }
                >
                  <i
                    className="fa-solid fa-cloud"
                    style={{ color: isSaved ? "green" : "" }}
                  ></i>
                </button>
              </Tooltip>

              <Tooltip text={isLocked ? "UnLock" : "Lock"}>
                {/* When 'locked' show tooltip as 'Unlock' */}
                <button
                  className="cur-po code-buttons"
                  onClick={() =>
                    isLocked ? setIsLocked(false) : setIsLocked(true)
                  }
                >
                  {isLocked ? (
                    <i
                      className="fa-solid fa-lock"
                      style={{ color: "red" }}
                    ></i>
                  ) : (
                    <i className="fa-solid fa-unlock"></i>
                  )}
                </button>
              </Tooltip>
            </div>
            <div className="code-container-header-right">
              <button
                className="cur-po code-buttons"
                onClick={() => navigate("/")}
              >
                <i className="fa-solid fa-arrow-left"></i>Back to Home
              </button>
            </div>
          </div>
          <div className="code-area">
            {/* html */}
            <textarea
              name="html-textarea"
              id="code-area-html"
              placeholder="Enter your HTML code here"
              className={`text-area ${
                selectedButton === "HTML" ? "" : "do-not-display"
              } ${isLocked ? "locked" : ""}`}
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, setHtml, html)}
              onMouseUp={(e) => handleTextSelect(e, setSelectedText, html)}
            ></textarea>

            {/* CSS */}
            <textarea
              name="css-textarea"
              id="code-area-css"
              placeholder="Enter your CSS code here"
              className={`text-area ${
                selectedButton === "CSS" ? "" : "do-not-display"
              } ${isLocked ? "locked" : ""}`}
              value={css}
              onChange={(e) => setCss(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, setCss, css)}
              onMouseUp={(e) => handleTextSelect(e, setSelectedText, css)}
            ></textarea>

            {/* JS */}
            <textarea
              name="js-textarea"
              id="code-area-js"
              placeholder="Enter your JavaScript code here"
              className={`text-area ${
                selectedButton === "JS" ? "" : "do-not-display"
              } ${isLocked ? "locked" : ""}`}
              value={js}
              onChange={(e) => setJs(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, setJs, js)}
              onMouseUp={(e) => handleTextSelect(e, setSelectedText, js)}
            ></textarea>
          </div>
        </div>
        <div className="output-container">
          <div className="output-container-header">
            <Tooltip text={"Output"}>
              <button className="cur-po code-buttons active">
                <i className="fa-solid fa-terminal"></i>
              </button>
            </Tooltip>
          </div>
          <div className="output-main">
            {/* Render Output - iFrame */}
            <iframe title="Result" srcDoc={output} sandbox="allow-scripts" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
