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
    // const { vendorId, productId } = await usb.getDevices();
    const device = await usb.getDevices();
    console.log("vendorId", device.vendorId);
    console.log("productId", device.productId);
    const res = await usb.requestDevice({
      filters: [device.vendorId, device.productId],
    });
    console.log(res);
  });

  async function handleUSBAccess() {
    try {
      const device = await usb.getDevices();
      const res = await usb.requestDevice({
        filters: [device.vendorId, device.productId],
      });
      console.log("vendorId", device.vendorId);
      console.log("productId", device.productId);
      console.log(res);
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
