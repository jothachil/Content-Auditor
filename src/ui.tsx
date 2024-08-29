import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
import { pluginApi } from "./api";
import Button from "./components/Button";
declare function require(path: string): any;

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onCreate = () => {
    const count = Number(inputRef.current?.value || 0);
    pluginApi.createRectangle(count);
    pluginApi.notify(`Added ${count} rectangles`);
  };

  const onCancel = () => {
    pluginApi.exit();
  };

  return (
    <main className="bg-white h-[100vh] flex flex-col justify-center items-center w-full">
      <Button label="Create" onClick={onCreate} />
      <Button label="Cancel" onClick={onCancel} />
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));
