import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Bot, Gem } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const About = () => {
  const features = [
    {
      icon: Eye,
      title: 'Missão',
      description: 'A VisionLink busca criar soluções que melhore a conectividade do cliente transformando a experiência menos frustrante e lenta e deixando-a mais estável, eficaz, ágil e prática com a nossa internet de qualidade e com o auxilio do nosso chatbot inteligente com suporte automatizado.',
      color: 'bg-blue-500'
    },
    {
      icon: Bot,
      title: 'Chat Bot',
      description: 'Desenvolvemos um chatbot que possui o auxílio de uma IA treinada para atender as necessidades do cliente, treinada para diagnosticar falhas e problemas na sua rede e orientar o usuário oferecendo soluções possíveis com base nas informações fornecidas pelo o mesmo.',
      color: 'bg-green-500'
    },
    {
      icon: Gem,
      title: 'Valores',
      description: 'A VisionLink propõe um serviço inovador e personalizado compreendendo as necessidades do cliente, oferecendo orientações precisas de como solucionar os problemas identificados, disponibilizando um suporte 24 horas por dia e todos os dias e entregando uma internet de qualidade e alta disponibilidade.',
      color: 'bg-purple-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sobre a VisionLink
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conectando você ao futuro com tecnologia de ponta e atendimento personalizado
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group">
                <CardContent className="p-8 text-center relative">
                  {/* Background decoration */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500" />
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Suporte Disponível</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime Garantido</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Clientes Satisfeitos</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

