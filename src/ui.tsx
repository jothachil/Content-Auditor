import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
import { pluginApi } from "./api";
import Dropdown from "./components/Dropdown";
import {
  Disclosure,
  Tip,
  Title,
  Input,
  Select,
  Button,
} from "react-figma-plugin-ds";
import "react-figma-plugin-ds/figma-plugin-ds.css";

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
        <div className="">
          <Select
            className="asd"
            defaultValue=""
            onChange={function _() {}}
            onExpand={function _() {}}
            options={[
              {
                label: "Item 1",
                title: "Item 1 description",
                value: 1,
              },
              {
                label: "Item 2",
                title: "Item 2 description",
                value: 2,
              },
            ]}
            placeholder="Placeholder text..."
          />
        </div>
      </div>
      <hr className="border-t  border-neutral-200 " />
      <div className="pt-2 flex items-center gap-x-2 p-2">
        <div className="flex-1">
          <Input
            className=""
            defaultValue=""
            onChange={function _() {}}
            placeholder="Enter Name Placeholder"
          />
        </div>
      </div>
      <div className=" absolute bottom-0 w-full ">
        <hr className="border-t border-neutral-200 " />
        <div className="p-2">
          <Button className="w-full flex justify-center">Hello figma</Button>
        </div>
      </div>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));
