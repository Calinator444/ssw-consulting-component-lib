import Image from "next/image";
import { ReactElement } from 'react';
import { tinaField } from "tinacms/dist/react";
import { ColorPickerOptions } from "../interfaces/color-options";
import ComponentWrapper from "../internal/component-wrapper";
import { defaultBackgroundOptions } from "../internal/default-config/default-bg-options";
import { Marquee } from "../internal/shadcn/marquee";

export default function LogoCarousel(props: {
  data: any;
  options?: {
    backgroundColors: ColorPickerOptions[];
    contentWidth: number;
  }
  children?: React.ReactNode;
}): ReactElement {
  const { data, options } = props;
  return (
    <ComponentWrapper data={data} backgroundOptions={options?.backgroundColors ?? defaultBackgroundOptions}>
        <div className="flex w-full flex-col items-center justify-center pb-14" style={{ maxWidth: options?.contentWidth }}>
          <h2
            className="p-2 text-xl font-semibold text-white md:text-2xl"
            data-tina-field={tinaField(data, "heading")}
          >
            {data.heading}
          </h2>
          <div className="mask-horizontal-fade relative h-17 w-full md:h-40">
            <Marquee
              pauseOnHover
              className="h-full justify-center overflow-hidden"
            >
              <div className="flex h-full items-center justify-center gap-3">
                {data.logos &&
                  data.logos.map((logo, index) => (
                    <div
                      className="relative h-17 min-w-36 md:h-22 md:min-w-48"
                      key={`logo-${index}`}
                    >
                      <Image
                        src={logo?.logo ?? "/images/placeholder.png"}
                        alt={logo?.altText ?? "Logo"}
                        fill={true}
                        objectFit="contain"
                        data-tina-field={tinaField(logo, "altText")}
                        className={
                          data.isWhiteImages ? "brightness-0 invert" : ""
                        }
                      />
                    </div>
                  ))}
              </div>
            </Marquee>
          </div>
        </div>
    </ComponentWrapper>
  );
}
