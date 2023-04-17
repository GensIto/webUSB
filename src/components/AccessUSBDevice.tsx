export const AccessUSBDevice = () => {
  const usb = (navigator as any).usb;

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
      <button onClick={handleUSBAccess}>Access USB Device</button>
    </div>
  );
};
