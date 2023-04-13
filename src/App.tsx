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

  const handleGet = async () => {
    try {
      const device = await usb.getDevices();
      console.log(device);
    } catch (error) {
      alert(error);
    }
  };

  usb.addEventListener("connect", (event: any) => {
    console.log("usb", usb);
    console.log("event", event);
  });

  return (
    <div>
      <button onClick={handleRequest}>Request USB Device</button>
      <button onClick={handleGet}>Get USB Device</button>
    </div>
  );
}

export default App;
