import { useRef, useState, useEffect } from 'react';
import Globe from './globe';
import SparklesText from './Sparkles';
import NumberTicker from './number';
import Marquee from "react-fast-marquee";
import { motion } from 'framer-motion';
import { cn } from './lib/utils';
import './App.css';

const reviews = [
  {
    name: "Ansem",
    username: "@blknoiz06",
    body: "found the next insane cook. who wants ca?",
    img: "ansem.png",
  },
  {
    name: "Bill Ackman",
    username: "@BillAckman",
    body: "fund is doubling down on MSI69420. data points up",
    img: "bill.png",
  },
  {
    name: "Yenni",
    username: "@Yennii56",
    body: "ok finally found a cook. this is about to rip",
    img: "yenni.png",
  },
  {
    name: "Nancy Pelosi",
    username: "@SpeakerPelosi",
    body: "due to insider info my entry is 6k. send it",
    img: "nancy.png",
  },
  {
    name: "Wolf Of Crypto",
    username: "@W0LF0FCRYPT0",
    body: "here to shill the f*ck out of this. only up",
    img: "wolf.png",
  },
  {
    name: "Elon Musk",
    username: "@elonmusk",
    body: "MSI69420 might reach mars before me. trump in?",
    img: "elon.png",
  },
];

const reviewss = [
  {
    name: "Mitch",
    username: "@idrawline",
    body: "if you don't ape here. idek man. retar dio",
    img: "mitch.png",
  },
  {
    name: "Cathie Wood",
    username: "@CathieDWood",
    body: "selling off current holdings to gain more exposure",
    img: "cathie.png",
  },
  {
    name: "ZachXBT",
    username: "@zachxbt",
    body: "super safu surprisingly. really good tech here",
    img: "zach.png",
  },
  {
    name: "Donald Trump",
    username: "@realDonaldTrump",
    body: "only for winners this thing. real winners. endorsing this",
    img: "don.png",
  },
  {
    name: "Roaring Kitty",
    username: "@TheRoaringKitty",
    body: "it's time to run it back. crypto style",
    img: "kitty.png",
  },
  {
    name: "Jim Cramer",
    username: "@jimcramer",
    body: "buy. buy. buy. this thing is only going up",
    img: "kramer.png",
  },
];

const CA = 'coming soon';
 
const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 bg-white"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="40" height="40" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-lg font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-base font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-lg">{body}</blockquote>
    </figure>
  );
};

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleSeek = (e) => {
    const time = e.target.value;
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='bg-[#ffefff]'>
      <div className="h-screen w-screen relative">
        {/* Existing content */}
        <div className='absolute top-4 left-4 flex items-center z-[50] space-x-2 text-3xl font-custom text-[#FEBAFF]'>
            <a href="https://x.com/MSI69420sol" className='transition ease-in-out duration-150 underline'>
              X
            </a>
            <a href="https://t.me/MSI69420Portal" className='transition ease-in-out duration-150 underline'>
              TG
            </a>
        </div>

        {/* Enhanced Audio Player */}
        <div className='absolute top-4 right-4 z-[50] bg-[#A5FFF2] p-4 border-2 border-[#FEBAFF]'>
          <audio ref={audioRef} src="/creed.mp3" />
          <div className="flex items-center space-x-2 mb-2">
            <button 
              onClick={togglePlay}
              className='bg-[#FEBAFF] text-[#A5FFF2] px-4 py-2 rounded-full font-custom text-sm'
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 range-slider"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-custom text-[#FEBAFF]">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="flex-grow range-slider"
            />
            <span className="text-xs font-custom text-[#FEBAFF]">{formatTime(duration)}</span>
          </div>
        </div>

        <Globe />
        {/* Rest of the existing content */}
        <div className="text-2xl md:text-3xl text-[#fff9a2] hidden">
          <div className="font-custom absolute bottom-[15%] left-[10%] flex">
            +<NumberTicker value={2370} />%
          </div>
          <div className="font-custom absolute right-[17%] bottom-[28%] hidden md:flex">
            +<NumberTicker value={433} />%
          </div>
          <div className="font-custom absolute right-[17%] top-0 md:top-[10%] hidden md:flex">
            +<NumberTicker value={3290} />%
          </div>
          <div className="font-custom absolute left-[17%] top-[26%] md:top-[35%] flex">
            +<NumberTicker value={895} />%
          </div>
          <div className="font-custom absolute left-[55%] md:left-[45%] top-[70%] md:top-[80%] flex">
            +<NumberTicker value={364} />%
          </div>
          <div className="font-custom absolute left-[22%] top-[10%] md:top-[6%] flex">
            +<NumberTicker value={1926} />%
          </div>
          <div className="font-custom absolute right-[13%] top-[20%] md:top-[32%] flex">
            +<NumberTicker value={115} />%
          </div>
        </div>

        <div className='absolute left-1/2 bottom-4 -translate-x-1/2 -translate-y-1/2 text-[#FEBAFF] bg-[#A5FFF2] border-2 border-[#FEBAFF] p-2 font-custom text-[9px] md:text-base whitespace-nowrap'>CA: coming soon</div>

        <img src="d.gif" className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[595px] opacity-90' alt="Centered GIF"/>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 font-custom text-3xl md:text-6xl text-center text-[#FEBAFF]'>
          <SparklesText text={'Memecoin'}/> 
          <span className='block whitespace-nowrap'><SparklesText text={'SuperCycle Index'}/></span> 
          <SparklesText text={'69420'}/>
        </div>
      </div>
      <div className="relative flex h-min py-[25%] md:py-[10%] w-full flex-col items-center justify-center overflow-hidden">
        <div className="w-full lg:w-[75%] 2xl:w-[50%] relative">
          {/* Gradient fade effect at the start and end */}
          <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-[#ffefff] dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#ffefff] dark:from-gray-900 to-transparent pointer-events-none z-10"></div>

          {/* Marquees */}
          <Marquee pauseOnHover={true} speed={80}>
            {reviews.map((review) => (
              <div key={review.username} className="mr-4">
                <ReviewCard {...review} />
              </div>
            ))}
          </Marquee>

          <Marquee direction="right" pauseOnHover={true} speed={80} className="mt-8">
            {reviewss.map((review) => (
              <div key={review.username} className="mr-4">
                <ReviewCard {...review} />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
      <div className='h-min py-[25%] md:py-[10%] w-full flex justify-center items-center'>
        <div className='relative w-full h-full flex justify-center items-center'>
          <img src="b.gif" className='w-[85%] md:w-[75%] rounded-xl' />
          <motion.a
            href='https://pump.fun/board'
            className='absolute left-10 md:left-1/4 bg-[#A5FFF2] text-3xl md:text-6xl text-[#FEBAFF] border-4 border-[#FEBAFF] p-4 md:p-6 font-custom rounded-lg'
            // Animation properties for pulsing effect
            animate={{ scale: [1, 1.05, 1] }} // Scale up and back to original
            transition={{
              duration: 0.8, // Duration of the pulse
              ease: "easeInOut", // Easing function
              repeat: Infinity, // Repeat indefinitely
            }}
          >
            BUY
          </motion.a>
        </div>
      </div>
    </div>
  );
}

export default App;