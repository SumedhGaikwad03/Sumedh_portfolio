import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { summary } from "../data/content";

export default function Summary() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-14 scroll-mt-16">
      <SectionHeader index="01" title="Summary" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="max-w-2xl space-y-4"
      >
        {summary.paragraphs.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-[var(--color-slate)] font-normal">
            {p}
          </p>
        ))}
      </motion.div>
    </section>
  );
}
