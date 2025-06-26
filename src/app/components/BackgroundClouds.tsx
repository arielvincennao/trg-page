'use client';

import Image from 'next/image';

interface BackgroundCloudsProps {
  onlyInScene?: boolean;
}

const BackgroundClouds = ({ onlyInScene }: BackgroundCloudsProps) => {


  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 overflow-visible">
      {/* Left Cloud */}
      <div className="absolute top-[4%] left-[-3%] w-[150px] h-[120px] sm:w-[280px] sm:h-[246px] md:w-[320px] md:h-[281px] lg:w-[360px] lg:h-[316px] overflow-visible scale-150">
        <div className="relative w-full h-full">
          <Image
            src="/assets/background/bg-cloud.svg"
            alt="Cloud background"
            width={359}
            height={316}
            className="object-contain absolute inset-0"
            priority
          />
        </div>
      </div>
      
      {/* Right Cloud */}
      <div className="absolute top-[32%] right-[-2%] w-[150px] h-[120px] sm:w-[280px] sm:h-[246px] md:w-[320px] md:h-[281px] lg:w-[360px] lg:h-[316px] overflow-visible scale-150">
        <div className="relative w-full h-full">
          <Image
            src="/assets/background/bg-cloud.svg"
            alt="Cloud background"
            width={359}
            height={316}
            className="object-contain absolute inset-0"
            priority
          />
        </div>
      </div>
      
      {/* Crosses */}
      {onlyInScene && (
        <div className="absolute bottom-[0%] left-[0%] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] overflow-visible transition-opacity duration-1500 opacity-100">
          <div className="relative w-full h-full">
            <Image
              src="/assets/background/bg-cross.svg"
              alt="Decorative cross"
              width={300}
              height={300}
              className="object-contain absolute inset-0"
              priority
            />
          </div>
        </div>
      )}
      
      {/* Left Glitch */}
      {onlyInScene && (
        <div className="absolute top-[58%] left-[-2%] w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] overflow-visible -translate-y-1/2 transition-opacity duration-1500 opacity-100">
          <div className="relative w-full h-full">
            <Image
              src="/assets/background/bg-glitch.svg"
              alt="Glitch effect"
              width={200}
              height={200}
              className="object-contain absolute inset-0"
              priority
            />
          </div>
        </div>
      )}

      {/* Rigth Glitch */}
      {onlyInScene && (
        <div className="absolute top-[85%] right-[0%] w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] overflow-visible -translate-y-1/2 transition-opacity duration-1500 opacity-100">
          <div className="relative w-full h-full">
            <Image
              src="/assets/background/bg-glitch.svg"
              alt="Glitch effect"
              width={200}
              height={200}
              style={{ transform: 'scaleX(-1)' }}
              className="object-contain absolute inset-0"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundClouds; 