import "./App.css";

function App() {
  const usb = (navigator as any).usb;

  const handleRequest = async () => {
    try {
      const device = await usb.requestDevice({ filters: [] });
      console.log(device);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <button onClick={handleRequest}>Request USB Device</button>
    </div>
  );
}

export default App;
