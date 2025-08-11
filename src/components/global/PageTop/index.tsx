// https://github.com/sanity-io/image-url

const PageTop = ({ image }: { image: string }) => {
  return (
    <div className="absolute top-0 left-0 leading-0 w-[calc(100vw+4px)] h-[470px] m-[-2px] _pointer-events-none z-[-1]">
      <img
        src={image}
        className="absolute leading-0 top-0 left-0 w-full h-full object-cover "
      />
      <div className="bg-linear-to-t from-sand to-transparent w-full h-[80%] absolute left-0 bottom-0" />
    </div>
  );
};

export default PageTop;
