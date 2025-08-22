import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

// Shared hook to observe element visibility
const useReveal = () => {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || visible) return; // guard
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: if not supported, show immediately
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [visible]);

  return [ref, visible];
};

const RevealProjectCard = ({ project, motionDelay = 0 }) => {
  const [ref, visible] = useReveal();
  return (
    <motion.div
      ref={ref}
      className="h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: motionDelay }}
    >
      {visible && <ProjectCard project={project} />}
    </motion.div>
  );
};

export default RevealProjectCard;
