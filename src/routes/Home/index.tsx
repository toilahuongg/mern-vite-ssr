import Button from '@src/components/Layout/Button';

const HomePage = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-11">
        <div className="col-span-6">
          <h1 className="text-4xl font-semibold text-white leading-normal">
            Devhugon is a <span className="text-primary">Backend developer</span> and
            <span className="text-primary"> Front-end developer</span>
          </h1>
          <p className="text-gray my-8">He crafts responsive websites where technologies meet creativity</p>
          <Button>Contact me!!</Button>
        </div>
        <div className="col-span-5"></div>
      </div>
    </div>
  );
};

export default HomePage;
