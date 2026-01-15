/* For testing purposes (image component; test successful)
import { ImgComponentByMariePierreLessard } from "./components/atoms/img-el";
import koala from "./_WW236934.jpg";
import "./App.css";
This was in the fragment:
<ImgComponentByMariePierreLessard src={koala} alt={"koala"} loading={"lazy"} className="test" />

For testing purposes (font family, font sizes, ...):
<div className="App">
    <h1>h1 h1 h1 h1</h1>
    <h2>h2 h2 h2 h2</h2>
    <h3>h3 h3 h3 h3</h3>
    <p>Text text text</p>
</div>

*/
import "./App.scss";
import "./styles/typography.module.scss";

function App() {

    return (
        <div className="App">
            <BlackjackGame />
        </div>
    )
};

export default App;
