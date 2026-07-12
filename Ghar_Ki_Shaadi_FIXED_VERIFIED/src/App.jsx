import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, Music2 } from "lucide-react";
import { weddingData as d } from "./weddingData";
import Opening from "./components/Opening";
import Countdown from "./components/Countdown";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const openInvitation = async () => {
    setOpened(true);
    try {
      await audioRef.current?.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const shareInvitation = async () => {
    const shareData = {
      title: "Mousame & Vatan Wedding",
      text: "सैनी परिवार की ओर से स्नेह निमंत्रण",
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("निमंत्रण लिंक कॉपी हो गया");
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/wedding-song.mp3" loop preload="auto" />

      <AnimatePresence>
        {!opened && <Opening onOpen={openInvitation} />}
      </AnimatePresence>

      {opened && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <section className="screen intro" id="invitation">
            <div className="content">
              <p className="mantra">॥ श्री गणेशाय नमः ॥</p>
              <div className="om">ॐ</div>
              <p>श्री राम की कृपा से</p>
              <h1>मंगल परिणयोत्सव</h1>
              <div className="divider">❦</div>
              <p className="bigcopy">हमारे परिवार में शुभ विवाह का<br />मंगल अवसर आया है</p>
              <p className="date">{d.date}</p>
              <a className="down" href="#couples">मंगल यात्रा आरंभ करें ⌄</a>
            </div>
          </section>

          <div id="couples">
            {d.couples.map((couple, index) => (
              <section className="screen couple" key={couple.groom}>
                <div className="content coupleBox">
                  <p className="label">शुभ विवाह</p>
                  <small>मंगल मिलन • {index ? "द्वितीय" : "प्रथम"}</small>
                  <h2>✦ {couple.groom} ✦</h2>
                  <p className="sang">संग</p>
                  <h2>✦ {couple.bride} ✦</h2>
                  <div className="divider">❦</div>
                  <p className="bigcopy">{couple.line}</p>
                </div>
              </section>
            ))}
          </div>

          <section className="screen brothers">
            <div className="content">
              <div className="orn">❦</div>
              <h1>एक आँगन, दो खुशियाँ</h1>
              <p className="orn">✦</p>
              <p className="bigcopy">दो भाइयों के जीवन में<br />आरंभ हो रहा है एक नया अध्याय</p>
              <h2>मौसम ❦ वतन</h2>
              <p className="bigcopy">आपके स्नेह और आशीर्वाद की<br />हमें प्रतीक्षा रहेगी</p>
            </div>
          </section>

          <Countdown targetDate={d.dateISO} />

          <section className="events">
            <div className="content">
              <p className="label">वैवाहिक कार्यक्रम</p>
              <h1>शुभ कार्यक्रम</h1>
              <div className="divider">❦</div>
              <div className="timeline">
                {d.events.map((event) => (
                  <article key={event.title}>
                    <b>{event.symbol}</b>
                    <div>
                      <h3>{event.title}</h3>
                      <p>{event.date}</p>
                      <span>{event.time}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="screen venue">
            <div className="content frame">
              <p className="label">पधारो सा</p>
              <h1>{d.venue.name}</h1>
              <div className="divider">✦</div>
              <p className="bigcopy">{d.venue.address}</p>
              <a className="btn" href={d.venue.mapUrl} target="_blank" rel="noreferrer">दिशा निर्देश देखें</a>
            </div>
          </section>

          <section className="screen light">
            <div className="content">
              <div className="om">ॐ</div>
              <h1>आपकी उपस्थिति ही<br />हमारा सौभाग्य है</h1>
              <div className="divider">❦</div>
              <p className="bigcopy">{d.invitation}</p>
              <h3>{d.family}</h3>
              <p>।। शुभ विवाह ।।</p>
              <button className="btn" onClick={shareInvitation}>निमंत्रण साझा करें</button>
            </div>
          </section>

          <footer className="screen footer">
            <div className="content">
              <h1>मौसम ❦ वतन</h1>
              <h3>Mousame & Vatan Wedding</h3>
              <p>सप्रेम — {d.family}</p>
            </div>
          </footer>
        </motion.main>
      )}

      {opened && (
        <button className="music" onClick={toggleMusic} aria-label="Toggle music">
          {playing ? <Music2 size={22} /> : <Music size={22} />}
        </button>
      )}
    </>
  );
}
