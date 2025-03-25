import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";
import { pluginApi } from "./api";
import { Input, Button, Label } from "react-figma-plugin-ds";
import "react-figma-plugin-ds/figma-plugin-ds.css";

function App() {
  const [count, setCount] = React.useState<string>("1");
  const [rotation, setRotation] = React.useState<string>("0");
  const [color, setColor] = React.useState<string>("#FF8A65");
  const [sizeIncrement, setSizeIncrement] = React.useState<string>("0");

  const onCreate = () => {
    const rectangleCount = Number(count) || 0;
    const rotationIncrement = Number(rotation) || 0;
    const sizeInc = Number(sizeIncrement) || 0;
    pluginApi.createRectangle(
      rectangleCount,
      rotationIncrement,
      color,
      sizeInc
    );
    pluginApi.notify("Created Rectangles");
  };

  return (
    <main className="bg-white h-[100vh] relative">
      <div className="flex flex-col">
        <div className="flex gap-2 items-start border-b border-gray-200 p-2">
          <Label className="" size="small" weight="medium">
            Number of Rectangles
          </Label>
          <div className="w-[300px]">
            <Input
              defaultValue={count}
              onChange={(value) => setCount(value)}
              placeholder="Enter number of rectangles"
              type="number"
            />
          </div>
        </div>
        <div className="flex gap-2 items-start border-b border-gray-200 p-2">
          <Label className="" size="small" weight="medium">
            Rotation Increment
          </Label>
          <div className="w-[300px]">
            <Input
              defaultValue={rotation}
              onChange={(value) => setRotation(value)}
              placeholder="Enter rotation increment"
              type="number"
            />
          </div>
        </div>
        <div className="flex gap-2 items-start border-b border-gray-200 p-2">
          <Label className="" size="small" weight="medium">
            Color
          </Label>
          <div className="w-[300px]">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 border-none bg-transparent outline-none border-white rounded overflow-hidden"
            />
          </div>
        </div>
        <div className="flex gap-2 items-start border-b border-gray-200 p-2">
          <Label className="" size="small" weight="medium">
            Size Increment
          </Label>
          <div className="w-[300px]">
            <Input
              defaultValue={sizeIncrement}
              onChange={(value) => setSizeIncrement(value)}
              placeholder="Enter size increment"
              type="number"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-2 border-t border-gray-200">
          <Button className="w-full flex justify-center" onClick={onCreate}>
            Create Rectangles
          </Button>
        </div>
      </div>
    </main>
  );
}

// Replace the old render method with the new createRoot API
const container = document.getElementById("react-page");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
