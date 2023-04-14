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

  usb.addEventListener("connect", async (event: any) => {
    const devices = await usb.getDevices();
    devices.forEach(async (device: any) => {
      console.log("vendorId", `${device.productName} is ${device.vendorId}`);
      console.log("productId", `${device.productName} is ${device.productId}`);
      // アクションがあればトレそう
      const res = await usb.requestDevice({
        filters: [{ vendorId: device.vendorId, productId: device.productId }],
      });
      console.log(res);
    });
  });

  async function handleUSBAccess() {
    try {
      const device = await usb.getDevices();
      const res = await usb.requestDevice({
        filters: [device.vendorId, device.productId],
      });

      console.log(res);
      console.log("res vendorId", res.vendorId);
      console.log("res productId", res.productId);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <button onClick={handleRequest}>Request USB Device</button>
      <button onClick={handleGet}>Get USB Device</button>
      <button onClick={handleUSBAccess}>Access USB Device</button>
    </div>
  );
}

export default App;
