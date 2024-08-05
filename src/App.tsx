import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { HelmetProvider } from "react-helmet-async";
import { ConfigProvider, Spin } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

import { theme } from "antd";
import { Provider } from "jotai";
import { regularStore } from "./config/store/jotaiStore";

function App() {
  return (
    <HelmetProvider>
      <Provider store={regularStore}>
        <ConfigProvider
          theme={{
            // token: { colorPrimary: "#00b96b" }
            algorithm: theme.defaultAlgorithm,
          }}
        >
          <StyleProvider hashPriority="high" layer>
            <RouterProvider
              router={router}
              fallbackElement={
                <Spin
                  spinning={true}
                  percent={"auto"}
                  fullscreen
                  size="large"
                />
              }
            />
          </StyleProvider>
        </ConfigProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
