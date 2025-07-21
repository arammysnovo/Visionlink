import React, { useState, useEffect } from 'react';
import { Check, Star, Wifi, Shield, Clock, Zap } from 'lucide-react';
import apiService from '../services/api';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await apiService.getPlans();
        setPlans(response.results || response);
      } catch (err) {
        console.error('Erro ao carregar planos:', err);
        setError('Erro ao carregar planos');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planId) => {
    if (!apiService.isAuthenticated()) {
      alert('Faça login para assinar um plano');
      return;
    }

    try {
      await apiService.subscribeToPlan(planId);
      alert('Assinatura realizada com sucesso!');
    } catch (error) {
      console.error('Erro ao assinar plano:', error);
      alert('Erro ao assinar plano: ' + error.message);
    }
  };

  const getPlanIcon = (planType) => {
    switch (planType) {
      case 'home': return <Wifi className="w-8 h-8" />;
      case 'quality': return <Star className="w-8 h-8" />;
      case 'ultra': return <Zap className="w-8 h-8" />;
      case 'vision': return <Shield className="w-8 h-8" />;
      default: return <Wifi className="w-8 h-8" />;
    }
  };

  const getPlanColor = (planType) => {
    switch (planType) {
      case 'home': return 'from-blue-500 to-blue-600';
      case 'quality': return 'from-green-500 to-green-600';
      case 'ultra': return 'from-purple-500 to-purple-600';
      case 'vision': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <section id="planos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Carregando Planos...</h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="planos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Erro ao Carregar Planos</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="planos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Planos</h2>
          <p className="text-xl text-gray-600">Escolha o plano ideal para suas necessidades de conectividade</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                plan.is_popular ? 'ring-4 ring-yellow-400 relative' : ''
              }`}
            >
              {plan.is_popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className={`bg-gradient-to-r ${getPlanColor(plan.plan_type)} text-white p-6 text-center`}>
                <div className="flex justify-center mb-4">
                  {getPlanIcon(plan.plan_type)}
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-1">
                  R$ {parseFloat(plan.price).toFixed(2).replace('.', ',')}
                  <span className="text-lg font-normal">/mês</span>
                </div>
                <p className="text-sm opacity-90">{plan.description}</p>
              </div>

              <div className="p-6">
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r ${getPlanColor(plan.plan_type)}`}>
                    {plan.speed_mbps} Mbps
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r ${getPlanColor(plan.plan_type)} hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                >
                  Assinar Agora
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-blue-500 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Sem fidelidade</h4>
              <p className="text-gray-600 text-sm">Cancele quando quiser</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-green-500 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Instalação grátis</h4>
              <p className="text-gray-600 text-sm">Sem custos adicionais</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-purple-500 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Suporte 24/7</h4>
              <p className="text-gray-600 text-sm">Sempre disponível</p>
            </div>
            <div className="flex flex-col items-center">
              <Wifi className="w-12 h-12 text-orange-500 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Wi-Fi incluso</h4>
              <p className="text-gray-600 text-sm">Equipamento gratuito</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;

