import Image from "next/image";

const PageTop = ({ image }: { image: string }) => {
  return (
    <div className="absolute top-0 left-0 leading-0 w-[calc(100vw+2px)] h-[470px] m-[-2px] _pointer-events-none z-[-1]">
      <Image
        src={image}
        alt=""
        className="absolute leading-0 top-0 left-0 w-full h-full object-cover"
        width={1920}
        height={600}
        sizes="100vw"
      />
      <div className="bg-linear-to-t from-sand to-transparent w-full h-[130%] absolute left-0 bottom-0" />
    </div>
  );
};

export default PageTop;
