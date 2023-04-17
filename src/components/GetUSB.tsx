export const GetUSB = () => {
  const usb = (navigator as any).usb;

  const handleGet = async () => {
    try {
      const device = await usb.getDevices();
      console.log(device);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <button onClick={handleGet}>Get USB Device</button>
    </div>
  );
};
