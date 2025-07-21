import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Phone } from 'lucide-react';
import { Button } from './ui/button';
import logoImage from '../assets/iba_logo.png';
import instagramIcon from '../assets/planos/image.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contatovisionlink@gmail.com',
      href: 'mailto:contatovisionlink@gmail.com'
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: '(81) 98240-9612',
      href: 'tel:+5581982409612'
    },
    {
      icon: MapPin,
      label: 'Endereço',
      value: 'Av. Visc. de Suassuna, 500 - Santo Amaro, Recife - PE, 50050-540',
      href: 'https://www.google.com.br/maps/place/Av.+Visc.+de+Suassuna,+500+-+Santo+Amaro,+Recife+-+PE,+50050-540/@-8.0524605,-34.8886382,17z/data=!3m1!4b1!4m6!3m5!1s0x7ab18eb42bc2071:0x7e8d763cc59eb411!8m2!3d-8.0524658!4d-34.8860633!16s%2Fg%2F11c11gpwmf?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D'
    }
  ];

  const quickLinks = [
    { label: 'Início', href: '#home' },
    { label: 'Sobre', href: '#about' },
    { label: 'Planos', href: '#plans' },
    { label: 'Contato', href: '#contact' }
  ];

  const services = [
    'Internet Fibra Óptica',
    'Wi-Fi Grátis',
    'Suporte 24/7',
    'Instalação Gratuita',
    'Teste de Velocidade',
    'Suporte Técnico'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <img 
                src={logoImage} 
                alt="VisionLink Logo" 
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold">VisionLink</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Conectando você ao futuro com internet de alta qualidade e suporte inteligente 24/7.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => window.open('https://www.instagram.com/visionlink_?igsh=MXQxYXYxaHFoN3RlNA==', '_blank')}
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => window.open('https://wa.me/558182409612', '_blank')}
              >
                <Phone className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Nossos Serviços</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 py-1">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : '_self'}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <contact.icon className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:text-blue-400" />
                  <span className="text-sm leading-relaxed">{contact.value}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="border-t border-gray-800"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} VisionLink. Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Suporte
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* WhatsApp Float Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="fixed bottom-6 left-6 z-40"
      >
        <Button
          onClick={() => window.open('https://wa.me/558182409612', '_blank')}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
          </svg>
        </Button>
      </motion.div>
    </footer>
  );
};

export default Footer;

