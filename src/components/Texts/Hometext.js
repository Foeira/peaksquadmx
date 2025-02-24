import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../../App.css"
import { useTranslation } from 'react-i18next';


function HomeText() {

  const {t} = useTranslation()
  return (

    <Container className='fluid'>
        <Row>
            <Col >
            <div className='text-home'>
              {t('homeTexts.hometext1')}
            </div>
            </Col>
            <Col>
            <div className='text-home2'>
              <ul style={{ listStyle: 'none', padding: 10, margin: 10 }}>
                <li>- {t('homeTexts.homeLine1')}</li>
                <li>- {t('homeTexts.homeLine2')}</li>
                <li>- {t('homeTexts.homeLine3')}</li>
                <li>- {t('homeTexts.homeLine4')}</li>
                <li>- {t('homeTexts.homeLine5')}</li>
              </ul>
            </div>
            </Col>
    </Row>
    </Container>
  );
}

export default HomeText;