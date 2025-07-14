import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import img1 from '../../public/formatura1.jpg';
import img2 from '../../public/formatura2.jpg';
import img3 from '../../public/formatura3.jpg';
import img4 from '../../public/formatura4.jpg';

// Componente do carrossel de fotos
const PhotoCarousel = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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

// Componente principal do convite
const InvitationContainer = styled.div`
  width: 100vw;
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  font-family: 'Playfair Display', serif;
  box-sizing: border-box;
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
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
  padding: 30px 0;
  border-bottom: 2px solid #f0f0f0;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 4px;
  opacity: 0.8;
`;

const Subtitle = styled.h2`
  font-size: 2.5rem;
  color: #2E8B57;
  margin-bottom: 15px;
  font-weight: 400;
  line-height: 1.2;
`;

const Course = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 8px;
  font-weight: 300;
  letter-spacing: 1px;
`;

const University = styled.p`
  font-size: 0.9rem;
  color: #95a5a6;
  font-weight: 300;
  letter-spacing: 0.5px;
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
`;

const DetailTitle = styled.h3`
  font-size: 0.8rem;
  color: #2E8B57;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.9;
`;

const DetailText = styled.p`
  font-size: 1.6rem;
  color: #2c3e50;
  margin-bottom: 5px;
  font-weight: 400;
  line-height: 1.3;
`;

const DetailSubtext = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  font-weight: 300;
  letter-spacing: 0.5px;
`;

const RSVPSection = styled.div`
  background: linear-gradient(135deg, #2E8B57 0%, #3CB371 100%);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  margin-top: 30px;
`;

const RSVPTitle = styled.h3`
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
`;

const RSVPForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
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
  
  &:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Body: React.FC = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  
  // Array de fotos do formando (substitua pelos URLs reais)
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

  // Calcula a translação baseada na foto atual
  const translateX = -currentPhoto * 25; // 25% para cada foto (4 fotos = 100%)

  return (
    <InvitationContainer>
      <InvitationCard>
        {/* Carrossel de Fotos */}
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

        {/* Cabeçalho */}
        <Header>
          <Title>Convite de Formatura</Title>
          <Subtitle>Emily lohane Amaral Cunha</Subtitle>
          <Course>Terapia Ocupacional</Course>
          <University>Universidade do Estado do Pará</University>
        </Header>

        {/* Detalhes do Evento */}
        <EventDetails>
          <DetailCard>
            <DetailIcon>📍</DetailIcon>
            <DetailTitle>Local</DetailTitle>
            <DetailText>Villa Festas</DetailText>
            <DetailSubtext>São Paulo, SP</DetailSubtext>
          </DetailCard>

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

        {/* Seção RSVP */}
        <RSVPSection>
          <RSVPTitle>Confirmar Presença</RSVPTitle>
          <RSVPForm>
            <Input type="text" placeholder="Nome completo" />
            <Input type="email" placeholder="E-mail" />
            <Input type="tel" placeholder="Telefone" />
            <ConfirmButton type="submit">
              Confirmar Presença
            </ConfirmButton>
          </RSVPForm>
        </RSVPSection>
      </InvitationCard>
    </InvitationContainer>
  );
};

export default Body;
