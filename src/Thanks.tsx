import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Thanks() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('nome') || 'Candidato';
  const firstName = name.split(' ')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-12">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80')"
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎉 Parabéns, {firstName}! 🎉
          </h1>
          <p className="text-xl text-blue-100">
            Sua inscrição foi enviada com sucesso!
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          <div className="flex justify-center mb-8">
            <img 
              src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=600"
              alt="Estudantes celebrando"
              className="rounded-xl shadow-lg w-full max-w-md"
            />
          </div>

          <h2 className="text-2xl font-bold text-green-600">
            Sua Jornada Começa Agora!
          </h2>

          <div className="space-y-4 text-left">
            <p className="text-lg">
              Fique de olho no seu WhatsApp, pois entraremos em contato em breve com mais detalhes sobre os próximos passos.
            </p>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-2">O que acontece agora?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">1.</span>
                  Nossa equipe irá avaliar seu perfil
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">2.</span>
                  Você poderá ser convidado para uma entrevista inicial
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">3.</span>
                  Se necessário, indicaremos cursos de qualificação para aumentar suas chances
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">4.</span>
                  Seu perfil será apresentado às empresas parceiras
                </li>
              </ul>
            </div>

            <p className="text-gray-600">
              Lembre-se: o curso de qualificação profissional é totalmente opcional, mas pode aumentar significativamente suas chances de ser selecionado.
            </p>
          </div>

          <div className="pt-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar para página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thanks;
