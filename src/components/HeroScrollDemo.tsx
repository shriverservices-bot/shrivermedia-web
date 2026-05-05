import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[100px] pt-[100px]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-[#51DCA1]">
                Unique Animations
              </span>
            </h1>
          </>
        }
      >
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
          alt="hero"
          className="mx-auto rounded-2xl object-cover h-full object-center w-full"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
