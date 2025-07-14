import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import convite from '../../public/convite_emily.jpg';
import './Convite.css';

const Convite: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!containerRef.current) return;

    try {
      // Captura todo o container com html2canvas
      const canvas = await html2canvas(containerRef.current, {
        scale: 2, // Alta resolução
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });

      // Proporção do A4 (largura/altura)
      const a4Ratio = 210 / 297;
      const canvasRatio = canvas.width / canvas.height;

      let sx = 0, sy = 0, sWidth = canvas.width, sHeight = canvas.height;

      // Se o canvas for mais largo que o A4, corta nas laterais
      if (canvasRatio > a4Ratio) {
        sWidth = canvas.height * a4Ratio;
        sx = (canvas.width - sWidth) / 2;
      } else if (canvasRatio < a4Ratio) {
        // Se o canvas for mais alto, corta em cima/baixo
        sHeight = canvas.width / a4Ratio;
        sy = (canvas.height - sHeight) / 2;
      }

      // Cria um novo canvas com proporção A4
      const finalCanvas = document.createElement('canvas');
      const ctx = finalCanvas.getContext('2d');
      finalCanvas.width = 2100; // 10x para alta resolução
      finalCanvas.height = 2970;

      if (!ctx) return;

      // Desenha a área cortada do canvas no canvas final
      ctx.drawImage(
        canvas,
        sx, sy, sWidth, sHeight, // Fonte (corte)
        0, 0, finalCanvas.width, finalCanvas.height // Destino (canvas A4)
      );

      // Gera o PDF
      const imgData = finalCanvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', [297, 210]); // A4 retrato
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      
      // Adiciona link clicável no PDF
      // Calcula a posição do botão no PDF (baseado na posição relativa)
      const buttonTop = 66; // 66% da altura
      const buttonLeft = 49.5; // 49.5% da largura
      const buttonWidth = 90; // largura do botão em pixels
      const buttonHeight = 90; // altura do botão em pixels
      
      // Converte para milímetros (baseado no canvas capturado)
      const canvasWidth = canvas.width;
      const pdfWidth = 210; // largura A4 em mm
      const pdfHeight = 297; // altura A4 em mm
      
      // Calcula a posição central do botão
      const linkX = (buttonLeft / 100) * pdfWidth;
      const linkY = (buttonTop / 100) * pdfHeight;
      
      // Converte o tamanho do botão de pixels para mm
      // Assumindo que o canvas tem 2100px de largura para 210mm
      const scaleFactor = pdfWidth / canvasWidth;
      const linkWidth = buttonWidth * scaleFactor * 1.5; // Aumentado 50%
      const linkHeight = buttonHeight * scaleFactor * 1.5; // Aumentado 50%
      
      // Ajusta para o centro do botão
      const finalLinkX = linkX - (linkWidth / 2);
      const finalLinkY = linkY - (linkHeight / 2);
      
      // Adiciona o link clicável
      pdf.link(finalLinkX, finalLinkY, linkWidth, linkHeight, {
        url: 'https://patricksampa.github.io/presentation_portfolio/'
      });
      
      pdf.save('convite-emily.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }
  };

  return (
    <div className="convite-container">
      <div 
        ref={containerRef}
        className="image-pdf-container" 
        style={{ position: 'relative', display: 'inline-block' }}
      >
        <img 
          src={convite} 
          alt="Convite Emily" 
          className="convite-image"
        />
        <a
          href="https://patricksampa.github.io/presentation_portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="botao-sobre-imagem"
          style={{
            position: 'absolute',
            top: '66%', // Ajustado para mais abaixo
            left: '49.5%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            display: 'block',
            width: '90px',
            height: '90px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        >
         
        </a>
      </div>
      <div className="pdf-controls">
        <button onClick={generatePDF} className="generate-pdf-btn">
          📄 Gerar PDF da Imagem
        </button>
      </div>
    </div>
  );
};

export default Convite;
