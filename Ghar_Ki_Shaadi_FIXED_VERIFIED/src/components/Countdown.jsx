import { useEffect, useState } from "react";

const hd = "०१२३४५६७८९";
const hn = (n) => String(n).padStart(2, "0").replace(/\d/g, (x) => hd[+x]);

function left(targetDate) {
  const diff = Math.max(new Date(targetDate) - Date.now(), 0);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60
  };
}

export default function Countdown({ targetDate }) {
  const [time, setTime] = useState(() => left(targetDate));

  useEffect(() => {
    const interval = setInterval(() => setTime(left(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="screen countdown">
      <div className="content">
        <p className="gold">शुभ घड़ी आने में</p>
        <h1>मंगल प्रतीक्षा</h1>
        <div className="grid">
          {[["दिन", time.days], ["घंटे", time.hours], ["मिनट", time.minutes], ["सेकंड", time.seconds]].map(([label, value]) => (
            <div key={label}><strong>{hn(value)}</strong><span>{label}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
