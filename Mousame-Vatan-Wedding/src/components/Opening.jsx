import { motion } from "framer-motion";

export default function Opening({ onOpen }) {
  return (
    <motion.div className="opening" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="petals">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} style={{ "--i": i }}>{i % 2 ? "❀" : "✿"}</span>
        ))}
      </div>
      <motion.div className="openingCard frame" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
        <p className="mantra">॥ श्री गणेशाय नमः ॥</p>
        <div className="om">ॐ</div>
        <p>शुभ विवाह</p>
        <h1>स्नेह निमंत्रण</h1>
        <div className="divider">❦</div>
        <p className="family">सैनी परिवार</p>
        <button className="btn" onClick={onOpen}>निमंत्रण खोलें</button>
      </motion.div>
    </motion.div>
  );
}
