import { useState, useMemo } from "react";

const expensive = () => {
    return "data"
}

function App() {

    const [count, setCount] = useState(0);

    // Once the component render, use Memo() will store the same return value from expensive() 
    // and it will assign the same processed result to 'data' without running expensive() again
    // - no matter how many times the component re-render
    // it will re run the expensive() when the given dependency array change | [] -> [1]
    const data = useMemo(() => {
        return expensive();
    }, []);

    return <div>
        <h1>Count: {count}</h1>
        <button onClick={() => setCount(count + 1)}>
            Button
        </button>
    </div>;
}