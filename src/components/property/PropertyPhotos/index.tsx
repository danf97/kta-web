import { Button } from "@/components/ui/Button";
import { Col } from "@/components/ui/Col";
import { Row } from "@/components/ui/Row";
import { ImageObjectType } from "@/sanity/queries/objects/imageObject";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PropertyPhotos = ({
  photos,
  photoSliderIsOpen,
  togglePhotoSlider,
  lang = "en",
}: {
  photos?: ImageObjectType[];
  photoSliderIsOpen: boolean;
  togglePhotoSlider: () => void;
  lang?: string;
}) => {
  // First 4 only
  const photosUrlsShort = photos?.slice(0, 4).map((photo) => photo.url) || [];
  const photosUrls = photos?.map((photo) => photo.url) || [];
  const photosCount = photos?.length ? photos.length - 4 : 0;

  const ref = useRef<HTMLDivElement>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const handlePhotoChange = (index: number) => {
    setActivePhotoIndex(index);
    const activePhotoElement = document.getElementById(`photo-${index}`);
    const activePhotoRect = activePhotoElement?.getBoundingClientRect();

    console.log(`photo-${index}`);

    if (activePhotoRect && ref.current) {
      const newTop = Math.max(
        0,
        activePhotoRect.top + ref.current.scrollTop - 86
      );
      ref.current.scrollTo({
        top: newTop,
        behavior: "smooth",
      });
    }
  };

  // useEffect(() => {
  //   // Set active photo index on scroll
  //   const handleScroll = () => {
  //     const scrollTop = ref.current?.scrollTop || 0;
  //     console.log("scrollTop", scrollTop);

  //     const scrollHeight = ref.current?.scrollHeight || 0;
  //     const clientHeight = ref.current?.clientHeight || 0;

  //     if (scrollTop + clientHeight >= scrollHeight) {
  //       // User has scrolled to the bottom
  //       console.log("Scrolled to bottom");
  //     }
  //   };

  //   const currentRef = ref.current;
  //   currentRef?.addEventListener("scroll", handleScroll);

  //   return () => {
  //     currentRef?.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-12">
        <h2 className="body-l">Photos</h2>

        <Button type="secondary" label="See all" onClick={togglePhotoSlider} />
      </div>

      <div onClick={togglePhotoSlider} className="cursor-pointer" role="button">
        {photos && photos.length > 0 ? (
          <div className="grid grid-cols-2 gap-1">
            {photosUrlsShort.map((photo, index) => {
              if (!photo) return null;

              return (
                <div key={index} className="relative aspect-[4/2.6]">
                  <Image
                    src={photo}
                    alt={""}
                    width={400}
                    height={260}
                    className="object-cover absolute w-full h-full left-0 top-0"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p>No photos available</p>
        )}
      </div>

      <div className="pt-2">
        <p
          onClick={togglePhotoSlider}
          className="cursor-pointer text-center hover:underline"
          role="button"
        >
          + {photosCount} more
        </p>
      </div>

      <div
        className={`
          fixed left-0 bg-white h-[calc(100vh-16px)] z-10 rounded-t-3xl border border-black overflow-hidden mx-[-1px] w-[calc(100%+2px)]
          transition-all duration-200
          ${
            photoSliderIsOpen
              ? "visible opacity-100 bottom-0"
              : "invisible opacity-0 -bottom-28"
          }
      `}
      >
        <div className="max-h-full overflow-auto" ref={ref}>
          <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-[1]">
            <p className="body-s text-center">All photos</p>

            <Button
              className="!absolute right-4 top-1/2 -translate-y-1/2"
              type="secondary"
              size="icon"
              state={
                activePhotoIndex === photosUrls.length - 1 ? "disabled" : "idle"
              }
              onClick={() => {
                togglePhotoSlider();
              }}
              leftIcon={<XMarkIcon />}
            />
          </div>

          <Row className="relative">
            <Col className="w-full flex gap-4 flex-col py-4">
              {photosUrls.map((photo, index) => {
                if (!photo) return null;

                return (
                  <div
                    key={index}
                    className="relative w-full"
                    id={`photo-${index}`}
                  >
                    <Image
                      src={photo}
                      alt={""}
                      width={1296}
                      height={864}
                      sizes="100vw"
                      className="object-contain w-full h-auto max-h-[calc(100vh-16px-64px)] left-0 top-0"
                    />
                  </div>
                );
              })}
            </Col>
          </Row>
        </div>

        <div className="flex flex-col gap-2 justify-between absolute right-4 top-1/2 -translate-y-1/2">
          <Button
            type="primary"
            size="icon"
            state={activePhotoIndex === 0 ? "disabled" : "idle"}
            onClick={() => {
              // setActivePhotoIndex((prev) => Math.max(prev - 1, 0));
              handlePhotoChange(Math.max(activePhotoIndex - 1, 0));
            }}
            leftIcon={<ArrowUpIcon />}
          />
          <Button
            type="primary"
            size="icon"
            state={
              activePhotoIndex === photosUrls.length - 1 ? "disabled" : "idle"
            }
            onClick={() => {
              // setActivePhotoIndex((prev) =>
              //   Math.min(prev + 1, photosUrls.length - 1)
              // );
              handlePhotoChange(
                Math.min(activePhotoIndex + 1, photosUrls.length - 1)
              );
            }}
            leftIcon={<ArrowDownIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyPhotos;
