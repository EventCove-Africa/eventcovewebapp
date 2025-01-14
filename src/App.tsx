import logo from "./assets/icons/logo.svg";

function App() {
  return (
    <div className="w-full h-screen flex flex-col gap-3 justify-center items-center">
      <a href="https://eventcove.africa" target="_blank">
        <img src={logo} alt="logo" />
      </a>
      <h3 className="text-2xl text-dark_300">COMING SOON...</h3>
    </div>
  );
}

export default App;
