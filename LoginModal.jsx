import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import apiService from '../services/api';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (!isLogin && formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    }

    if (!isLogin) {
      if (!formData.password_confirm) {
        newErrors.password_confirm = 'Confirmação de senha é obrigatória';
      } else if (formData.password !== formData.password_confirm) {
        newErrors.password_confirm = 'Senhas não coincidem';
      }

      if (!formData.first_name) {
        newErrors.first_name = 'Nome é obrigatório';
      }

      if (!formData.last_name) {
        newErrors.last_name = 'Sobrenome é obrigatório';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        const response = await apiService.login({
          email: formData.email,
          password: formData.password
        });
        
        alert('Login realizado com sucesso!');
        onLoginSuccess && onLoginSuccess(response.user);
        onClose();
      } else {
        const response = await apiService.register(formData);
        
        alert('Cadastro realizado com sucesso!');
        onLoginSuccess && onLoginSuccess(response.user);
        onClose();
      }
    } catch (error) {
      console.error('Erro na autenticação:', error);
      
      if (error.message.includes('Credenciais inválidas')) {
        setErrors({ password: 'Email ou senha incorretos' });
      } else if (error.message.includes('email já está em uso')) {
        setErrors({ email: 'Este email já está cadastrado' });
      } else {
        setErrors({ general: error.message || 'Erro no servidor. Tente novamente.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      password_confirm: '',
      first_name: '',
      last_name: '',
      phone: '',
      address: ''
    });
    setErrors({});
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Bem-vindo à VisionLink
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-blue-100 mt-2">
            {isLogin ? 'Acesse sua conta ou crie uma nova' : 'Crie sua conta para começar'}
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          {/* Tab Buttons */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                isLogin
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                !isLogin
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Cadastrar
            </button>
          </div>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.first_name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Seu nome"
                      />
                    </div>
                    {errors.first_name && (
                      <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sobrenome *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.last_name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Seu sobrenome"
                      />
                    </div>
                    {errors.last_name && (
                      <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Senha *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password_confirm"
                      value={formData.password_confirm}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.password_confirm ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Confirme sua senha"
                    />
                  </div>
                  {errors.password_confirm && (
                    <p className="text-red-500 text-xs mt-1">{errors.password_confirm}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Seu endereço completo"
                    />
                  </div>
                </div>
              </>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Esqueceu a senha?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              <button
                onClick={switchMode}
                className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
              >
                {isLogin ? 'Cadastre-se' : 'Faça login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

