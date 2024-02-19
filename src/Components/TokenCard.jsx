import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react'


TokenCard.propTypes = {
  walletAdaValue: PropTypes.object
};

export default function TokenCard(props) {
  // const { theme, currentFileIndex } = useAppState();

  // document.querySelector("body").setAttribute('data-theme', theme)
  // const [data, setData] = useState(null);

  let totalAda = Math.round(( props.walletAdaValue.lovelace/ 1000000) * 100) / 100
 

  return (
    <Card className="coin-gradient-card" style={{ width: '30rem', border: '2px solid #6a008a' }}>
      <Card.Body>
        <Container>
          <Row>
            <Col>
              <Stack style={{ alignItems: 'center' }}>
                <div><img src="data:image/png;base64,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" 
                          className="shadowed rounded-circle profile-pic bg-paper" 
                          alt="icon"></img>
                </div>
                <div>
                  <i className="bg-info p-0 m-0 ml-1 px-1 rounded shadowed">coin</i>
                </div>
                <div>
                  <h6 title="Verified coin." className="d-inline token-badge rounded text-success text-center font-weight-normal  m-0 p-1 inner-shadowed">
                    <i className=" mdi mdi-check-all text-success text-shadow "></i>
                    <span>Cardano Coin</span>
                  </h6>
                </div>
              </Stack>
            </Col>
            <Col >
              {totalAda} ADA
            </Col>
          </Row>
        </Container>


      </Card.Body>
    </Card>

  );
}

