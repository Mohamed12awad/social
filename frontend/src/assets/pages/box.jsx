import { motion } from "framer-motion";

const Box = () => {
  return (
    <motion.div
      style={{
        width: 100,
        height: 100,
        backgroundColor: "blue",
      }}
      initial={{ scale: 0 }}
      animate={{ rotate: 180, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    />
  );
};

export default Box;
