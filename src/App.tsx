import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Building2,
  Calendar,
  ChevronDown,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  User,
  MessageSquare,
  Instagram,
  Facebook,
  Linkedin,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { supabase } from './lib/supabase';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [isMinor, setIsMinor] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    responsibleName: '',
    responsiblePhone: '',
    region: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatPhoneForWebhook = (phone: string) => {
    return `55${phone.replace(/\D/g, '')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Get all URL parameters
      const urlParams = new URLSearchParams(location.search);
      const urlParamsObject: Record<string, string> = {};
      urlParams.forEach((value, key) => {
        urlParamsObject[key] = value;
      });

      // Format phone numbers for webhook
      const webhookData = {
        ...formData,
        whatsapp: formatPhoneForWebhook(formData.whatsapp),
        responsiblePhone: isMinor
          ? formatPhoneForWebhook(formData.responsiblePhone)
          : '',
        // Add minor status
        menor18anos: isMinor ? 'SIM' : 'NAO',
        // Add URL data
        url: window.location.href,
        urlParams: urlParamsObject,
        referrer: document.referrer || '',
      };

      // Save to Supabase
      const { error: supabaseError } = await supabase.from('applications').insert([
        {
          full_name: formData.fullName,
          whatsapp: formData.whatsapp,
          responsible_name: isMinor ? formData.responsibleName : '',
          responsible_phone: isMinor ? formData.responsiblePhone : '',
          region: formData.region,
          created_at: new Date().toISOString(),
        },
      ]);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error('Erro ao salvar sua inscrição. Por favor, tente novamente.');
      }

      // Send webhook with additional URL data
      const webhookResponse = await fetch(
        'https://hook.profusaodigital.com/webhook/programa-jovem-aprendiz-microlins',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': window.location.origin,
          },
          body: JSON.stringify(webhookData),
        }
      );

      if (!webhookResponse.ok) {
        throw new Error('Erro ao processar sua inscrição. Por favor, tente novamente.');
      }

      // Redirect to thank you page
      navigate(`/obrigado?nome=${encodeURIComponent(formData.fullName)}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error instanceof Error ? error.message : 'Ocorreu um erro ao enviar sua inscrição. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Phone number validation
    if (name === 'whatsapp' || name === 'responsiblePhone') {
      const phoneNumber = value.replace(/\D/g, '');
      if (phoneNumber.length <= 11) {
        const formattedPhone = phoneNumber.replace(
          /^(\d{2})(\d{4,5})(\d{4}).*/,
          '($1) $2-$3'
        );
        setFormData((prev) => ({ ...prev, [name]: formattedPhone }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const regions = [
    'Campinas Amoreiras',
    'Campinas John Boyd Dunlop',
    'Sumaré - Centro',
  ];

  const faqItems = [
    {
      question: 'Quem pode participar?',
      answer:
        'Jovens entre 14 e 24 anos que estejam cursando ou tenham concluído o ensino médio.',
    },
    {
      question: 'Qual é a carga horária?',
      answer:
        'A carga horária é de 20 a 30 horas semanais, compatível com seus estudos.',
    },
    {
      question: 'Preciso pagar algo para me inscrever?',
      answer: 'Não! A inscrição é totalmente gratuita.',
    },
    {
      question: 'Quanto tempo dura o programa?',
      answer:
        'O programa tem duração de 15 a 24 meses, dependendo do curso escolhido.',
    },
  ];

  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'Ex-Jovem Aprendiz',
      image:
        'https://cdn.discordapp.com/attachments/1351631278663008418/1351988238105055373/knigthsclub_rosto_de_um_menina_adolescente_de_16_anos_brasileir_601aa064-7976-4392-8bd5-d5fabae84001.png?ex=67dc60aa&is=67db0f2a&hm=3457715b4c25005ddeef9c1def610ec387ec2af54bababb2b6ebaa7dc924faac&?auto=format&fit=crop&q=80&w=200&h=200',
      text: 'O programa mudou minha vida! Hoje trabalho na empresa onde fiz meu aprendizado.',
    },
    {
      name: 'Pedro Santos',
      role: 'Jovem Aprendiz Atual',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
      text: 'Estou aprendendo muito e já consigo ver um futuro brilhante pela frente.',
    },
    {
      name: 'Júlia Oliveira',
      role: 'Ex-Jovem Aprendiz',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
      text: 'A experiência prática que adquiri foi fundamental para minha carreira.',
    },
  ];

  const videoTestimonials = [
    {
      name: "Carolina Silva",
      vimeoEmbedUrl: "https://player.vimeo.com/video/1082032380"
    },
    {
      name: "Gustavo Lira",
      vimeoEmbedUrl: "https://player.vimeo.com/video/1082032406"
    },
    {
      name: "Laís Sousa",
      vimeoEmbedUrl: "https://player.vimeo.com/video/1082032355"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="relative bg-blue-600 text-white">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80')",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <img
              src="https://jovemaprendiz.b-cdn.net/logo%20jovem%20aprendiz%20microlins.png"
              alt="Jovem Aprendiz Logo"
              className="mx-auto h-20 md:h-24 w-auto mb-6"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Inscreva-se no Programa Jovem Aprendiz e Conquiste Seu Futuro!
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              A sua oportunidade de aprender na prática, ganhar experiência e
              construir uma carreira profissional de sucesso.
            </p>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <section className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Faça sua Inscrição
          </h2>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-gray-700">
                Menor de 18 anos?
              </span>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isMinor ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                onClick={() => setIsMinor(!isMinor)}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isMinor ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  placeholder="Ex: João Silva"
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label
                htmlFor="whatsapp"
                className="block text-sm font-medium text-gray-700"
              >
                WhatsApp
              </label>
              <div className="mt-1 relative">
                <input
                  type="tel"
                  name="whatsapp"
                  id="whatsapp"
                  required
                  placeholder="Ex: (11) 91234-5678"
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                />
                <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div
              className={`space-y-6 transition-all duration-300 ${
                isMinor ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
              }`}
            >
              <div>
                <label
                  htmlFor="responsibleName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome do Responsável
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="responsibleName"
                    id="responsibleName"
                    required={isMinor}
                    placeholder="Ex: Maria da Silva"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={formData.responsibleName}
                    onChange={handleInputChange}
                  />
                  <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="responsiblePhone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Telefone do Responsável
                </label>
                <div className="mt-1 relative">
                  <input
                    type="tel"
                    name="responsiblePhone"
                    id="responsiblePhone"
                    required={isMinor}
                    placeholder="Ex: (11) 3232-4567"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={formData.responsiblePhone}
                    onChange={handleInputChange}
                  />
                  <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700"
              >
                Região de Preferência
              </label>
              <div className="mt-1 relative">
                <select
                  name="region"
                  id="region"
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  value={formData.region}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione uma região</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Minha Inscrição'}
            </button>

            <p className="text-[9px] text-gray-500 mt-4 leading-tight">
              O Programa Jovem Aprendiz dessa página requer que você passe por
              uma análise profissional onde poderá ser indicado a um curso
              profissionalizante para ser inserido no mercado de trabalho e ter
              as habilidades básicas necessárias para ser selecionado. O curso
              não é obrigatório, mas será um diferencial dando vantagem na hora
              da seleção. Seus dados ficam no nosso sistema a pode ser indicado
              para empresas por até 12 meses. Caso não queria mais participar
              nem ser indicado, basta solicitar via e-mail ou WhatsApp a remoção
              dos seus dados.
            </p>
          </form>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefícios do Programa</h2>
            <p className="text-xl text-blue-600 font-semibold">
              PARTICIPAR DO PROCESSO SELETIVO DE MAIS DE 933 VAGAS SOMENTE NESTA
              REGIÃO
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <img
                src="https://jovemaprendiz.b-cdn.net/logo%20jovem%20aprendiz%20microlins.png"
                alt="Formação Profissional"
                className="mx-auto h-12 w-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Formação Profissional
              </h3>
              <p className="text-gray-600">
                Certificação reconhecida no mercado de trabalho
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <Building2 className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Experiência Prática
              </h3>
              <p className="text-gray-600">
                Aprenda com as melhores empresas parceiras
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <DollarSign className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Remuneração</h3>
              <p className="text-gray-600">
                Salário e benefícios garantidos por lei
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <Calendar className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Horários Flexíveis</h3>
              <p className="text-gray-600">Compatível com seus estudos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Depoimentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Depoimentos em Vídeo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoTestimonials.map((video, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  {video.name}
                </h3>
                <div className="aspect-[9/16]">
                  <iframe
                    src={video.vimeoEmbedUrl}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                    title={`Depoimento de ${video.name}`}
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Como Funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <MessageSquare className="h-12 w-12 text-blue-600" />,
                title: 'Inscrição',
                description: 'Preencha o formulário nesta página',
              },
              {
                icon: <Phone className="h-12 w-12 text-blue-600" />,
                title: 'Contato',
                description: 'Aguarde nosso contato via WhatsApp',
              },
              {
                icon: <User className="h-12 w-12 text-blue-600" />,
                title: 'Entrevista',
                description: 'Compareça à entrevista de seleção',
              },
              {
                icon: (
                  <img
                    src="https://jovemaprendiz.b-cdn.net/logo%20jovem%20aprendiz%20microlins.png"
                    alt="Início"
                    className="h-12 w-auto"
                  />
                ),
                title: 'Início',
                description: 'Inicie sua jornada como Jovem Aprendiz',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                  onClick={() =>
                    setActiveAccordion(activeAccordion === index ? null : index)
                  }
                >
                  <span className="font-semibold">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 transform transition-transform ${
                      activeAccordion === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === index && (
                  <div className="px-6 py-4 border-t border-gray-200">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <img
                src="https://jovemaprendiz.b-cdn.net/logo%20jovem%20aprendiz%20microlins.png"
                alt="Jovem Aprendiz Logo"
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-400">Programa Jovem Aprendiz</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  contato@jovemaprendiz.com
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  0800 123 4567
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-blue-400">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-blue-400">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <Link to="/termos-de-uso" className="hover:text-white">
                    Termos de Uso
                  </Link>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <Link
                    to="/politica-de-privacidade"
                    className="hover:text-white"
                  >
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 flex items-center justify-between">
            <p className="text-gray-400">
              © 2025 Programa Jovem Aprendiz. Todos os direitos reservados.
            </p>
            <div className="flex items-center text-gray-400">
              <Shield className="h-5 w-5 mr-2" />
              Site Seguro
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;