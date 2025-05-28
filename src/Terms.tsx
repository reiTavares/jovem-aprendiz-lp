import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar para página inicial
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Termos de Uso - Programa Jovem Aprendiz</h1>

          <section className="prose prose-blue max-w-none">
            <h2>Introdução</h2>
            <p>Este documento estabelece os termos e condições para participação e inscrição no Programa Jovem Aprendiz, oferecido através desta página, uma iniciativa privada com objetivo de promover oportunidades de crescimento profissional e pessoal a jovens em situação de desemprego.</p>

            <h2>Aceitação dos Termos</h2>
            <p>Ao preencher o formulário e enviar sua inscrição, você automaticamente concorda com estes termos e condições. A inscrição implica autorização expressa para que a Microlins entre em contato por meio das informações fornecidas (telefone, WhatsApp, e-mail, etc.) para oferecer cursos de especialização, orientações e possíveis oportunidades de emprego através do Programa Jovem Aprendiz.</p>

            <h2>Sobre o Programa Jovem Aprendiz</h2>
            <p>O Programa Jovem Aprendiz tem caráter de incentivo educacional e profissionalizante. Através dele, são oferecidas oportunidades para cursos de especialização profissional com a Microlins, objetivando preparar jovens para possíveis vagas em empresas parceiras. A inscrição neste site não garante uma vaga direta como jovem aprendiz.</p>

            <h2>Processo de Seleção</h2>
            <p>A inscrição efetuada através deste site atua como um pré-filtro, selecionando candidatos com potencial para serem encaminhados às empresas parceiras. As empresas são as únicas responsáveis pelo processo seletivo final, podendo aplicar testes, entrevistas ou outros métodos de avaliação próprios.</p>

            <h2>Responsabilidades</h2>
            <ul>
              <li><strong>Do Candidato</strong>: Fornecer informações verdadeiras, completas e atualizadas ao preencher o formulário de inscrição.</li>
              <li><strong>Da Microlins e Programa Jovem Aprendiz</strong>: Realizar a triagem inicial e encaminhar os perfis mais adequados às empresas parceiras. Não há garantia de contratação ou compromisso com a vaga.</li>
            </ul>

            <h2>Comunicação</h2>
            <p>Ao realizar sua inscrição, você concorda em receber comunicações informativas, promocionais e relacionadas ao processo seletivo por parte da Microlins e das empresas parceiras através dos dados fornecidos no formulário.</p>

            <h2>Privacidade</h2>
            <p>As informações fornecidas serão utilizadas exclusivamente para os fins deste programa, obedecendo às normas previstas na Lei Geral de Proteção de Dados (LGPD). Para mais detalhes, consulte nossa Política de Privacidade.</p>

            <h2>Alterações nos Termos</h2>
            <p>Reservamo-nos o direito de alterar estes termos a qualquer momento. É recomendável consultar regularmente este documento.</p>

            <h2>Contato</h2>
            <p>Para dúvidas, sugestões ou informações adicionais, entre em contato conosco através dos canais oficiais indicados na página principal.</p>

            <hr className="my-8" />

            <p className="text-sm text-gray-600">Ao realizar sua inscrição, você concorda integralmente com estes termos e condições.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;
