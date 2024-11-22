import { Col, Row } from 'react-bootstrap';
import React from 'react';
import { RECIPE_IMAGES } from './i18n/constants';


const RecipeImg = () => {
  return (
    <div className="App">
      <div className="container mt-5">
        <Row>
          {RECIPE_IMAGES.map((img) => (
            <Col xs={12} md={4} sm={6} key={img.alt}>
              <img src={img.src} alt={img.alt} className="personal-recipe-img"/>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default RecipeImg;