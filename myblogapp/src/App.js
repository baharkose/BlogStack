import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { router } from "./router/AppRouter";

function App() {
  return (
    <>
      <RouterProvider router={router}>
        <AppRouter />
      </RouterProvider>
    </>
  );
}

export default App;
