import { ThreeDots } from 'react-loader-spinner';
export default function Loader() {
  return (
    <div>
      <ThreeDots
        visible={true}
        height="70"
        width="70"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
