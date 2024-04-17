import { TailSpin } from "react-loader-spinner";

const Loader = ({ h = 40, w = 40, color = "black" }) => {
  return (
    <TailSpin
      visible={true}
      height={h}
      width={w}
      color={color}
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
