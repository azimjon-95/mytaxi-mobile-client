import { registerRootComponent } from 'expo';
import { Provider } from "react-redux";
import { store } from "./src/context/store";
import App from "./App";

function Index() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

registerRootComponent(Index);