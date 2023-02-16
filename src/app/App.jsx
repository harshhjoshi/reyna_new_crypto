import NavigationRoutes from "../navigation/NavigationRoutes"; // All Routes
const { AFRIX_BASE_URL } = process.env;

const App = () => {
  return (
    /* NavigationRoutes use For All Pages/Routers */
    <NavigationRoutes basename={AFRIX_BASE_URL} />
  );
}

export default App;
