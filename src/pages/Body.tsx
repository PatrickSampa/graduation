import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import img1 from '../../public/formatura1.jpg';
import img2 from '../../public/formatura2.jpg';
import img3 from '../../public/formatura3.jpg';
import img4 from '../../public/formatura4.jpg';

const PhotoCarousel = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  
  @media (max-width: 768px) {
    height: 350px;
    border-radius: 12px;
    margin-bottom: 20px;
  }
`;

const CarouselContainer = styled.div<{ translateX: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => props.translateX}%);
  height: 100%;
  width: 400%;
`;

const CarouselImage = styled.img`
  width: 25%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  flex-shrink: 0;
  padding: 2px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  color: #333;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
  
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 16px;
    
    &.prev {
      left: 5px;
    }
    
    &.next {
      right: 5px;
    }
  }
`;

const CarouselIndicator = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
`;

const Indicator = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const InvitationContainer = styled.div`
  width: 100vw;
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  font-family: 'Playfair Display', serif;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const InvitationCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #2E8B57, #3CB371, #2E8B57);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 15px;
    margin: 0 10px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
  padding: 30px 0;
  border-bottom: 2px solid #f0f0f0;
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
    padding: 20px 0;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 4px;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    letter-spacing: 2px;
    margin-bottom: 15px;
  }
`;

const Subtitle = styled.h2`
  font-size: 2.5rem;
  color: #2E8B57;
  margin-bottom: 15px;
  font-weight: 400;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    line-height: 1.3;
  }
`;

const Course = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 8px;
  font-weight: 300;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const University = styled.p`
  font-size: 0.9rem;
  color: #95a5a6;
  font-weight: 300;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const EventDetails = styled.div`
  margin: 60px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const DetailCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #f8f9fa;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2E8B57, #3CB371);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 768px) {
    padding: 25px;
    border-radius: 15px;
  }
`;

const LocationCard = styled.a`
  background: #fff;
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #f8f9fa;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  display: block;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2E8B57, #3CB371);
  }
  
  &::after {
    content: '🗺️ Abrir no Maps';
    position: absolute;
    top: 15px;
    right: 15px;
    background: linear-gradient(135deg, #2E8B57, #3CB371);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    
    &::after {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    padding: 25px;
    border-radius: 15px;
    
    &::after {
      top: 10px;
      right: 10px;
      padding: 4px 8px;
      font-size: 0.6rem;
    }
  }
`;

const DetailIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, #2E8B57, #3CB371);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(46, 139, 87, 0.3);
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
`;

const LocationIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, #2E8B57, #3CB371);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(46, 139, 87, 0.3);
  position: relative;
  
  &::after {
    content: '↗';
    position: absolute;
    top: -5px;
    right: -5px;
    background: #fff;
    color: #2E8B57;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
    margin-bottom: 15px;
    
    &::after {
      width: 18px;
      height: 18px;
      font-size: 0.7rem;
    }
  }
`;

const DetailTitle = styled.h3`
  font-size: 0.8rem;
  color: #2E8B57;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    letter-spacing: 1px;
  }
`;

const DetailText = styled.p`
  font-size: 1.6rem;
  color: #2c3e50;
  margin-bottom: 5px;
  font-weight: 400;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const DetailSubtext = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  font-weight: 300;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const RSVPSection = styled.div`
  background: linear-gradient(135deg, #2E8B57 0%, #3CB371 100%);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    padding: 25px 20px;
    margin-top: 20px;
  }
`;

const RSVPTitle = styled.h3`
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 15px;
  }
`;

const RSVPForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const Input = styled.input`
  padding: 12px 15px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
  
  &::placeholder {
    color: #7f8c8d;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
`;

const ConfirmButton = styled.button`
  padding: 15px 30px;
  background: #fff;
  color: #2E8B57;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover:not(:disabled) {
    background: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 1rem;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #2E8B57;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const MessageContainer = styled.div<{ type: 'success' | 'error' }>`
  background: ${props => props.type === 'success' 
    ? 'linear-gradient(135deg, #4CAF50, #45a049)' 
    : 'linear-gradient(135deg, #f44336, #da190b)'};
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

const MessageText = styled.p`
  font-size: 1rem;
  margin-bottom: 15px;
  opacity: 0.9;
`;

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
`;

const ContactText = styled.p`
  font-size: 0.9rem;
  margin-bottom: 8px;
`;

const ContactLink = styled.a`
  color: white;
  text-decoration: underline;
  font-weight: 600;
  
  &:hover {
    opacity: 0.8;
  }
`;

const SuccessAnimation = keyframes`
  0% { transform: scale(0.7); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
`;

const SuccessContainer = styled(MessageContainer)`
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: #1b3a2b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  border: none;
  box-shadow: 0 8px 32px rgba(67, 233, 123, 0.15);

  @media (max-width: 600px) {
    min-height: 120px;
    padding: 16px;
  }
`;

const SuccessIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 12px;
  animation: ${SuccessAnimation} 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  @media (max-width: 600px) {
    font-size: 2.2rem;
    margin-bottom: 8px;
  }
`;

const SuccessTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const SuccessText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0;
  text-align: center;
  opacity: 0.95;
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

const Body: React.FC = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const photos = [
    img1,
    img2,
    img3,
    img4
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [photos.length]);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToPhoto = (index: number) => {
    setCurrentPhoto(index);
  };

 
  const translateX = -currentPhoto * 25; 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.Name.trim() || !formData.Email.trim() || !formData.Phone.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Name', formData.Name);
      formDataToSend.append('Email', formData.Email);
      formDataToSend.append('Phone', formData.Phone);

       await fetch('https://script.google.com/macros/s/AKfycbzOqaJ79BtHxqtUrNou7RQJHWriWSpqcZP0daYw-Vb6nYWrirueHJtkskaZj14Cqkp54w/exec', {
        method: 'POST',
        body: formDataToSend,
      });

      // Se chegou aqui, considere sucesso!
      setSubmitStatus('success');
      setFormData({ Name: '', Email: '', Phone: '' });
      
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Erro ao enviar confirmação. Tente novamente ou entre em contato.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InvitationContainer>
      <InvitationCard>
        <PhotoCarousel>
          <CarouselContainer translateX={translateX}>
            {photos.map((photo, index) => (
              <CarouselImage key={index} src={photo} alt={`Foto ${index + 1}`} />
            ))}
          </CarouselContainer>
          
          <CarouselButton className="prev" onClick={prevPhoto}>
            ‹
          </CarouselButton>
          <CarouselButton className="next" onClick={nextPhoto}>
            ›
          </CarouselButton>
          
          <CarouselIndicator>
            {photos.map((_, index) => (
              <Indicator
                key={index}
                active={index === currentPhoto}
                onClick={() => goToPhoto(index)}
              />
            ))}
          </CarouselIndicator>
        </PhotoCarousel>

        <Header>
          <Title>Convite de Formatura</Title>
          <Subtitle>Emily lohane Amaral Cunha</Subtitle>
          <Course>Terapia Ocupacional</Course>
          <University>Universidade do Estado do Pará</University>
        </Header>

        <EventDetails>
          <LocationCard 
            href="https://www.google.com/maps/place/Condominio+Gran+Para%C3%ADso/@-1.3239604,-48.4412427,17z/data=!3m1!4b1!4m6!3m5!1s0x92a4613d60ae2825:0x21004f08a42db1f6!8m2!3d-1.3239604!4d-48.4386678!16s%2Fg%2F11j5jgmtpx?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir no Google Maps"
          >
            <LocationIcon>📍</LocationIcon>
            <DetailTitle>Local</DetailTitle>
            <DetailText>Condomínio Gran Paraíso</DetailText>
            <DetailSubtext>Belém, PA</DetailSubtext>
          </LocationCard>

          <DetailCard>
            <DetailIcon>📅</DetailIcon>
            <DetailTitle>Data</DetailTitle>
            <DetailText>14 de julho de 2024</DetailText>
            <DetailSubtext>Domingo</DetailSubtext>
          </DetailCard>

          <DetailCard>
            <DetailIcon>⏰</DetailIcon>
            <DetailTitle>Horário</DetailTitle>
            <DetailText>20:00</DetailText>
            <DetailSubtext>Cerimônia de Colação</DetailSubtext>
          </DetailCard>

          <DetailCard>
            <DetailIcon>🎓</DetailIcon>
            <DetailTitle>Cerimônia</DetailTitle>
            <DetailText>Colação de Grau</DetailText>
            <DetailSubtext>Formal</DetailSubtext>
          </DetailCard>
        </EventDetails>

        <RSVPSection>
          <RSVPTitle>Confirmar Presença</RSVPTitle>
          <RSVPForm onSubmit={handleSubmit}>
            <Input 
              type="text" 
              name="Name"
              placeholder="Nome completo" 
              value={formData.Name}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <Input 
              type="email" 
              name="Email"
              placeholder="E-mail" 
              value={formData.Email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <Input 
              type="tel" 
              name="Phone"
              placeholder="Telefone" 
              value={formData.Phone}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <ConfirmButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Enviando...
                </>
              ) : (
                'Confirmar Presença'
              )}
            </ConfirmButton>
          </RSVPForm>

          {submitStatus === 'success' && (
            <SuccessContainer type="success">
              <SuccessIcon>🎉</SuccessIcon>
              <SuccessTitle>Confirmação enviada!</SuccessTitle>
              <SuccessText>
                Obrigado por confirmar sua presença.<br />
                Você receberá um e-mail em breve.<br />
                <span style={{ fontSize: '0.95em', color: '#1b3a2b', opacity: 0.7 }}>
                  Caso precise alterar, envie uma mensagem para a organização.
                </span>
              </SuccessText>
            </SuccessContainer>
          )}

          {submitStatus === 'error' && (
            <MessageContainer type="error">
              <MessageTitle>❌ Erro ao Enviar</MessageTitle>
              <MessageText>
                {errorMessage}
              </MessageText>
              <ContactInfo>
                <ContactText>Se o problema persistir, entre em contato:</ContactText>
                <ContactLink href="https://wa.me/5591999999999" target="_blank">
                  📱 WhatsApp: (91) 99999-9999
                </ContactLink>
              </ContactInfo>
            </MessageContainer>
          )}
        </RSVPSection>
      </InvitationCard>
    </InvitationContainer>
  );
};

export default Body;
