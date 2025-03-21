import { useRef, useState, useEffect } from 'react';
import Globe from './globe';
import SparklesText from './Sparkles';
import NumberTicker from './number';
import Marquee from "react-fast-marquee";
import { motion } from 'framer-motion';
import { cn } from './lib/utils';
import './App.css';
import TradingSimulator from './Trade';
import Marque from './Marque';
import { AnimatedList } from './Ani';
import { Copy } from "lucide-react";
import Modal from './modal';

let notifications = [
  {
    name: "CZ",
    description: "BSC69000 super. takeover imminent",
    time: "3m ago",
    icon: "cpfp.jpg",
    color: "#FFFFFF",
  },
  {
    name: "Jinping",
    description: "glory to the CCP",
    time: "now",
    icon: "jpfp.png",
    color: "#FFFFFF",
  },
];

notifications = Array.from({ length: 1 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-12 items-center justify-center rounded-2xl overflow-hidden"
          style={{
            backgroundColor: color,
          }}
        >
          <img src={icon} alt="Icon" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

const FloatingImageWithChat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const fullMessage = "";

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div
      className={`z-20 w-[80%] sm:w-[40%] floating-container hidden md:block ${isVisible ? 'visible' : ''}`}
      style={{
        position: 'fixed',
      }}
    >
      <img
        src="c.png"
        alt="Floating Cz"
        className='w-[50%]'
      />
      <div
        className='absolute -top-[10%] -left-[10%]'
        style={{
          backgroundColor: 'transparent',
          padding: '10px',
          maxWidth: '200px',
          textAlign: 'center',
        }}
      >
        <div>
          <p className='p-1'>{fullMessage}</p>
        </div>
      </div>
    </div>
  );
};

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
    body: "fund is doubling down on BSC69000. data points up",
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
    body: "BSC69000 might reach mars before me. trump in?",
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
    body: "only for winners. real winners. endorsing $BNB",
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
  const [copied, setCopied] = useState(false);
  const [loyalToCz, setLoyalToCz] = useState(null);
  const address = "XXXXXXXXXXXXXXX"

  const handleConfirm = () => {
    setLoyalToCz(true);
    // Start playing music automatically
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  
  const handleDecline = () => {
    setLoyalToCz(false);
    // Redirect to another site
    window.location.href = "https://www.mcdonalds.com.cn/careers";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset "Copied!" message after 1.5 sec
  };

  // Format address: Show first 4 and last 4 chars (e.g., 0x12...aB)
  const formatAddress = (addr) => addr.slice(0, 4) + "..." + addr.slice(-4);

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
    <div className='bg-black'>
      <Marque />
      <Modal onConfirm={handleConfirm} onDecline={handleDecline} />
      <div className='fixed top-5 left-5 right-5 z-30'>
        <AnimatedList>
          {notifications.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>
      </div>
      <div className="h-screen w-screen relative">
        {/* Existing content */}
        <div className='absolute top-12 left-4 flex items-center z-10 space-x-2 text-3xl font-custom text-yellow-400'>
            <a href="https://x.com/" className='transition ease-in-out duration-150 underline'>
              X
            </a>
        </div>

        {/* Enhanced Audio Player */}
        <div className='absolute top-12 right-4 z-10 bg-black p-4 border-2 border-yellow-400'>
          <audio ref={audioRef} src="/china.mp3" loop/>
          <div className="flex items-center space-x-2 mb-2">
            <button 
              onClick={togglePlay}
              className='bg-black text-yellow-400 border border-yellow-400 px-4 py-2 rounded-full font-custom text-sm'
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
            <span className="text-xs font-custom text-yellow-400">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="flex-grow range-slider"
            />
            <span className="text-xs font-custom text-yellow-400">{formatTime(duration)}</span>
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

        <div
          className="absolute left-1/2 bottom-4 -translate-x-1/2 -translate-y-1/2 text-yellow-400 bg-black border-2 border-yellow-400 p-2 font-custom text-[9px] md:text-base whitespace-nowrap flex items-center space-x-2 cursor-pointer md:hover:scale-[103%] transition duration-150 ease-in-out"
          onClick={handleCopy}
        >
          <Copy className="w-4 h-4 md:w-5 md:h-5" />
          <span>{copied ? "Copied!" : formatAddress(address)}</span>
        </div>
        <img src="coin.gif" className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[400px] opacity-90' alt="Centered GIF"/>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 font-custom text-3xl md:text-6xl text-center text-yellow-400' style={{ WebkitTextStroke: '1px black', textStroke: '1px black' }}>
          <SparklesText text={'Binance'}/> 
          <span className='block whitespace-nowrap'><SparklesText text={'SuperCycle Index'}/></span>
          <span className='block whitespace-nowrap'><SparklesText text={'币安超级周期指数'}/></span> 
          <SparklesText text={'6900'}/>
        </div>
      </div>
      <div className='w-full flex justify-center pt-4 md:pt-10'>
        <TradingSimulator initialPrice={600}/>
      </div>
      <div className="relative flex h-min py-[25%] md:py-[10%] w-full flex-col items-center justify-center overflow-hidden">
        <div className="w-full lg:w-[75%] 2xl:w-[65%] relative">
          {/* Gradient fade effect at the start and end */}
          <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-black dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-black dark:from-gray-900 to-transparent pointer-events-none z-10"></div>

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
      <div className='h-min pb-[25%] md:pb-[10%] w-full flex justify-center items-center'>
        <div className='relative w-full h-full flex justify-center items-center'>
          <img src="n.gif" className='w-[85%] md:w-[75%] rounded-xl' />
          <motion.a
            href='https://four.meme'
            className='absolute left-10 md:left-1/4 bg-black text-3xl md:text-6xl text-yellow-400 border-4 border-yellow-400 p-4 md:p-6 font-custom'
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
      <FloatingImageWithChat />
    </div>
  );
}

export default App;