import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar para página inicial
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Política de Privacidade - Programa Jovem Aprendiz</h1>

          <section className="prose prose-blue max-w-none">
            <h2>Introdução</h2>
            <p>A privacidade dos seus dados pessoais é importante para nós. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações pessoais ao participar do Programa Jovem Aprendiz através desta página.</p>

            <h2>Informações Coletadas</h2>
            <p>Durante o processo de inscrição, coletamos as seguintes informações pessoais:</p>
            <ul>
              <li>Nome Completo</li>
              <li>Telefone e WhatsApp</li>
              <li>Nome e telefone do responsável</li>
              <li>Região de preferência para atuação profissional</li>
            </ul>
            <p>Essas informações são fornecidas voluntariamente pelos candidatos através do formulário disponível nesta página.</p>

            <h2>Finalidade do Uso das Informações</h2>
            <p>Utilizamos as informações coletadas exclusivamente para:</p>
            <ul>
              <li>Avaliar e pré-selecionar candidatos potenciais para encaminhamento às empresas parceiras;</li>
              <li>Entrar em contato com os candidatos para fornecer informações sobre cursos, oportunidades e processos seletivos;</li>
              <li>Enviar comunicações informativas ou promocionais diretamente relacionadas ao Programa Jovem Aprendiz.</li>
            </ul>

            <h2>Compartilhamento de Informações</h2>
            <p>As informações fornecidas podem ser compartilhadas com:</p>
            <ul>
              <li>Empresas parceiras participantes do Programa Jovem Aprendiz, exclusivamente com o propósito de possibilitar o processo seletivo;</li>
              <li>Microlins, para oferta de cursos profissionalizantes e complementares que fazem parte do programa.</li>
            </ul>
            <p>Não comercializamos nem fornecemos suas informações pessoais para terceiros não relacionados ao objetivo deste programa.</p>

            <h2>Segurança das Informações</h2>
            <p>Utilizamos medidas técnicas e administrativas adequadas para proteger suas informações pessoais contra acessos não autorizados, alterações, divulgação ou destruição. Seguimos padrões de segurança digital reconhecidos internacionalmente.</p>

            <h2>Seus Direitos</h2>
            <p>Você tem direito, conforme previsto pela Lei Geral de Proteção de Dados (LGPD), a:</p>
            <ul>
              <li>Solicitar acesso aos dados pessoais armazenados;</li>
              <li>Solicitar correções ou atualizações das informações fornecidas;</li>
              <li>Solicitar exclusão dos seus dados pessoais, observados os limites legais;</li>
              <li>Revogar seu consentimento para tratamento de dados a qualquer momento.</li>
            </ul>
            <p>Para exercer esses direitos, entre em contato pelos canais indicados ao final desta política.</p>

            <h2>Tempo de Armazenamento dos Dados</h2>
            <p>Suas informações pessoais serão armazenadas apenas pelo tempo necessário para o cumprimento das finalidades descritas nesta Política de Privacidade ou até que você solicite sua exclusão.</p>

            <h2>Alterações na Política de Privacidade</h2>
            <p>Esta Política poderá ser atualizada periodicamente. Qualquer alteração será publicada nesta página. Recomendamos que consulte regularmente este documento para se manter informado sobre como protegemos suas informações.</p>

            <h2>Contato</h2>
            <p>Para esclarecimentos, solicitações ou informações adicionais sobre esta Política de Privacidade, entre em contato conosco através dos canais oficiais disponíveis na página principal do Programa Jovem Aprendiz.</p>

            <hr className="my-8" />

            <p className="text-sm text-gray-600">Ao se inscrever no Programa Jovem Aprendiz, você reconhece e concorda com as práticas descritas nesta Política de Privacidade.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;