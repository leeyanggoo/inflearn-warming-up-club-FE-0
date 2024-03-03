import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

function App() {
  const inputStyle =
    "border-b-2 border-blue-500 focus:border-blue-300 transition";
  const buttonStyle =
    "px-5 py-1 bg-blue-600 rounded text-white hover:bg-blue-500 transition text-sm";

  return (
    <div className="App w-dvw h-dvh flex items-center justify-center overflow-hidden bg-blue-50">
      <div className="container flex flex-col justify-center gap-5">
        <header>
          <h1 className="text-3xl font-extrabold">💸 예산 계산기</h1>
        </header>
        <main className="bg-white p-5 flex flex-col gap-5">
          <Form inputStyle={inputStyle} buttonStyle={buttonStyle} />
          <hr className="border border-gray-200" />
          <Lists buttonStyle={buttonStyle} />
        </main>
      </div>
    </div>
  );
}

export default App;
