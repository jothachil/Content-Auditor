import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
import { pluginApi } from "./api";
import Button from "./components/Button";
import Dropdown from "./components/Dropdown";
import InputField from "./components/InputField";
declare function require(path: string): any;

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const options = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ]; // Updated options format

  const onCreate = () => {
    const count = Number(inputRef.current?.value || 0);
    pluginApi.createRectangle(count);
    pluginApi.notify(`Added ${count} rectangles`);
  };

  const onCancel = () => {
    pluginApi.exit();
  };

  const onSelect = (option: { value: string; label: string }) => {
    console.log(`Selected: ${option.label}`);
  };

  return (
    <main className="bg-white h-[100vh] relative ">
      <div className="pt-2 flex items-center gap-x-2 p-2">
        <div className="flex-1">
          <Dropdown
            options={options}
            onSelect={(value) =>
              onSelect(options.find((option) => option.value === value)!)
            }
          />
        </div>
      </div>
      <hr className="border-t  border-neutral-200 " />
      <div className="pt-2 flex items-center gap-x-2 p-2">
        <div className="flex-1">
          <InputField />
        </div>
      </div>
      <div className=" absolute bottom-0 w-full ">
        <hr className="border-t border-neutral-200 " />
        <div className="p-2">
          <Button label="Create" onClick={onCreate} />
        </div>
      </div>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));
