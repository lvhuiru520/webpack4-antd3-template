import { Button } from "antd";
import styled from "./App.less";
function App() {
  return (
    <div className={styled.App}>
      <div>app</div>
      <div className={styled["text-red"]}>content</div>
      <div className="border-10">border10</div>
      <div>
        <Button type="primary">btn133</Button>
      </div>
    </div>
  );
}
export default App;
