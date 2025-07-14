import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import convite from '../public/convite_emily.jpg';
import './Convite.css';

const Convite: React.FC = () => {
  const pdfRef = useRef<HTMLImageElement>(null);

  const generatePDF = async () => {
    if (!pdfRef.current) return;

    try {
      // Proporção do A4 (largura/altura)
      const a4Ratio = 210 / 297;
      const img = pdfRef.current;
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const imgRatio = imgW / imgH;

      let sx = 0, sy = 0, sWidth = imgW, sHeight = imgH;

      // Se a imagem for mais larga que o A4, corta nas laterais
      if (imgRatio > a4Ratio) {
        sWidth = imgH * a4Ratio;
        sx = (imgW - sWidth) / 2;
      } else if (imgRatio < a4Ratio) {
        // Se a imagem for mais alta, corta em cima/baixo
        sHeight = imgW / a4Ratio;
        sy = (imgH - sHeight) / 2;
      }

      // Cria um canvas com proporção A4
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 2100; // 10x para alta resolução
      canvas.height = 2970;

      if (!ctx) return;

      // Desenha a área cortada da imagem no canvas
      ctx.drawImage(
        img,
        sx, sy, sWidth, sHeight, // Fonte (corte)
        0, 0, canvas.width, canvas.height // Destino (canvas A4)
      );

      // Gera o PDF
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', [297, 210]); // A4 retrato
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      pdf.save('convite-emily.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }
  };

  return (
    <div className="convite-container">
      <div className="image-pdf-container" style={{ position: 'relative', display: 'inline-block' }}>
        <img 
          ref={pdfRef}
          src={convite} 
          alt="Convite Emily" 
          className="convite-image"
        />
        <button
          className="botao-sobre-imagem"
          onClick={() => window.open('https://seulink.com', '_blank')}
          style={{
            position: 'absolute',
            top: '66%', // Ajustado para mais abaixo
            left: '49.5%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2
          }}
        >
         
        </button>
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
