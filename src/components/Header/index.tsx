import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(headerRef);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap
      .timeline()
      .add('start')
      .to(
        q('.gs-1'),
        {
          xPercent: '-=50',
          autoAlpha: 0,
        },
        'start',
      )
      .to(
        q('.gs-2'),
        {
          width: '100%',
          xPercent: '+=50',
          autoAlpha: 0,
        },
        'start',
      )
      .to(
        q('.gs-3'),
        {
          top: 0,
          y: '-100%',
          autoAlpha: 1,
        },
        'start',
      )
      .to(q('.gs-4'), {
        left: '50%',
        x: '-50%',
        autoAlpha: 1,
      });
    ScrollTrigger.create({
      trigger: q('.gs-wrapper'),
      start: 'top top',
      pin: true,
      scrub: true,
      toggleActions: 'play none none reverse',
      animation: tl,
    });
  }, []);
  return (
    <section ref={headerRef} className="h-screen">
      <div className="fixed w-full bg-black bg-opacity-90 z-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center px-10 py-5">
            <div className="flex-none">
              <h2 className="text-3xl text-slate-50 font-extrabold">Hugon.</h2>
            </div>
            <div className="flex-1">
              <div className="flex justify-center font-medium">
                <div className="px-5 text-gray-50">Home</div>
                <div className="px-5 text-gray-500">About Me</div>
                <div className="px-5 text-gray-500">My Services</div>
                <div className="px-5 text-gray-500">Projects</div>
              </div>
            </div>
            <div className="flex-none">
              <button className="bg-green-500 font-bold rounded-md px-10 py-2"> Let's talk </button>
            </div>
          </div>
        </div>
      </div>
      <div className="gs-wrapper bg-black h-screen flex items-center justify-center overflow-hidden">
        <div className="gs-1 flex-1">
          <img src="/me.jpg" alt="" />
        </div>
        <div className="gs-2 items-center justify-center flex-1 text-9xl text-left font-serif gap-10">
          <div className=" text-white">I'M</div>
          <div className="">
            <div className="text-white">Fullstack</div>
            <div className="text-white">Developer</div>
          </div>
        </div>
        <div className="gs-3 absolute top-full left-50 opacity-0">
          <img src="/finger.png" alt="" />
        </div>
        <div className="gs-4 absolute top-50 right-0 text-8xl text-center text-white font-serif opacity-0">
          FUCK ALL RECRUITERS
        </div>
      </div>
      <div className="section a-4 bg-white h-screen"></div>
      <div className="section a-5 bg-red-500 h-screen"></div>
    </section>
  );
};

export default Header;
