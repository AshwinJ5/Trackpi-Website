import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SalesOutsourcing = () => {
  const options = { threshold: 0.1 };

  const [refHeader, inViewHeader] = useInView(options);
  const [refFeatures, inViewFeatures] = useInView(options);

  const features = [
    {
      title: 'End-to-End Sales Outsourcing Solutions',
      description:
        'Our End-to-End Sales Outsourcing Solutions provide a comprehensive approach to managing your entire sales process, from lead generation to closing deals. We offer specialized eams that seamlessly integrate with your business, helping you expand market reach, increase revenue, and reduce operational costs.',
      imageUrl:
        'https://thumbs.dreamstime.com/b/corporate-team-following-international-sales-process-client-feedback-using-interactive-board-to-present-resources-profit-333111286.jpg',
    },
    {
      title: 'Sales Performance Enhancement Services',
      description:
        ' With our Sales Performance Enhancement Services, we empower your business to achieve higher sales productivity and improved bottom-line results. We provide flexible outsourcing models where our experienced sales professionals take on key sales responsibilities, ensuring consistency and performance excellence.',
      imageUrl:
        'https://media.istockphoto.com/id/950986656/photo/business-finance-accounting-contract-advisor-investment-consulting-marketing-plan-for-the.jpg?s=612x612&w=0&k=20&c=U-y6cADCby4QwENFptPrVcK_MplesqZmnDxUMMkJZvM=',
    },
  ];

  return (
    <div>
      <section
        ref={refHeader}
        className="flex justify-center items-center p-5 w-full"
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inViewHeader ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
        >
          <h1
            className="text-5xl md:text-7xl text-amber-500"
            style={{ textShadow: '2px 2px black' }}
          >
            Sales Outsourcing
          </h1>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={refFeatures} className=" pb-10 px-10">
        {features.map((feature, index) => {
          const [ref, inView] = useInView({ threshold: 0.1 });

          return (
            <div
              key={index}
              ref={ref}
              className={`flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? '' : 'md:flex-row-reverse'
              }`}
            >
              <div className="md:w-1/2 p-4 w-100">
                <motion.img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={
                    inView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }
                  }
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                    delay: index * 0.2,
                  }}
                />
              </div>
              <motion.div
                className="md:w-1/2 p-4 w-100"
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={
                  inView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                }
                transition={{
                  duration: 0.8,
                  ease: 'easeInOut',
                  delay: index * 0.2,
                }}
              >
                <h2 className="text-2xl font-bold text-amber-500 fw-bold display-6">
                  {feature.title}
                </h2>
                <p className="text-xl md:text-justify md:text-lg">
                  {feature.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default SalesOutsourcing;
