import React from 'react';
import { motion } from "framer-motion";


const Animations = (children) => {
     return (
             <motion.div
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 transition={{ type: "spring", stiffness: 200, damping: 20 }}
             >
                 {children}
             </motion.div>

        );
};

export default Animations;