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
      const canvas = await html2canvas(containerRef.current, {
        scale: 2, 
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });

      const a4Ratio = 210 / 297;
      const canvasRatio = canvas.width / canvas.height;

      let sx = 0, sy = 0, sWidth = canvas.width, sHeight = canvas.height;

      if (canvasRatio > a4Ratio) {
        sWidth = canvas.height * a4Ratio;
        sx = (canvas.width - sWidth) / 2;
      } else if (canvasRatio < a4Ratio) {
        sHeight = canvas.width / a4Ratio;
        sy = (canvas.height - sHeight) / 2;
      }

      const finalCanvas = document.createElement('canvas');
      const ctx = finalCanvas.getContext('2d');
      finalCanvas.width = 2100; 
      finalCanvas.height = 2970;

      if (!ctx) return;

      ctx.drawImage(
        canvas,
        sx, sy, sWidth, sHeight,
        0, 0, finalCanvas.width, finalCanvas.height 
      );

      const imgData = finalCanvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', [297, 210]); 
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      
      const buttonTop = 66; 
      const buttonLeft = 49.5; 
      const buttonWidth = 90;
      const buttonHeight = 90; 
      
      const canvasWidth = canvas.width;
      const pdfWidth = 210; 
      const pdfHeight = 297;
      
      const linkX = (buttonLeft / 100) * pdfWidth;
      const linkY = (buttonTop / 100) * pdfHeight;
      
      const scaleFactor = pdfWidth / canvasWidth;
      const linkWidth = buttonWidth * scaleFactor * 1.5; 
      const linkHeight = buttonHeight * scaleFactor * 1.5; 
      
      const finalLinkX = linkX - (linkWidth / 2);
      const finalLinkY = linkY - (linkHeight / 2);
      
      pdf.link(finalLinkX, finalLinkY, linkWidth, linkHeight, {
        url: 'https://patricksampa.github.io/graduation/'
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
          href="https://patricksampa.github.io/graduation/"
          target="_blank"
          rel="noopener noreferrer"
          className="botao-sobre-imagem"
          style={{
            position: 'absolute',
            top: '66%', 
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
