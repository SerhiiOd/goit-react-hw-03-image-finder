import RingLoader from 'react-spinners/RingLoader';

const ring = {
  display: 'block',
  margin: '50px auto',
};

export const Loader = () => {
  return (
    <>
      <RingLoader
        color="#d8d00e"
        size={150}
        loading={true}
        cssOverride={ring}
        speedMultiplier={1}
        aria-label="Loading Ring"
        data-testid="loader"
      />
    </>
  );
};
