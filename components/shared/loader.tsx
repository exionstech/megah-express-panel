import { Variants, motion } from "framer-motion";

const LoaderPage = () => {
    return (
        <div className="grid place-content-center bg-transparent min-h-[90vh]">
            <Loader />
        </div>
    );
}

const variants = {
    initial: {
        scaleY: 0.5,
        opacity: 0,
    },
    animate: {
        scaleY: 1,
        opacity: 1,
        transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "circIn",
        },
    },
} as Variants;

const Loader = () => {
    return (
        <motion.div
            transition={{
                staggerChildren: 0.25,
            }}
            initial="initial"
            animate="animate"
            className="flex gap-1"
        >
            <motion.div variants={variants} className="h-12 w-2 bg-indigo-600" />
            <motion.div variants={variants} className="h-12 w-2 bg-indigo-600" />
            <motion.div variants={variants} className="h-12 w-2 bg-indigo-600" />
            <motion.div variants={variants} className="h-12 w-2 bg-indigo-600" />
        </motion.div>
    );
};

export default LoaderPage;