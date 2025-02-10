import { useState, useEffect } from "react";

export const useInView = (options = {}) => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                threshold: 0.5,
                ...options,
            }
        );

        const element = document.querySelector(options.selector);
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options.selector]);

    return isInView;
};
