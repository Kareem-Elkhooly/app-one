// Style File --------------------------------------------------
import "./css/about.css";
// From React and Redux ----------------------------------------
import React from "react";
// Local Components --------------------------------------------
import AppNavbar from "./../components/AppNavbar";
import Footer from "./../components/Footer";
// Bootstrap Components
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
// ##############################################################
function About() {
  return (
    <>
      <AppNavbar />
      <div className="pt-5 about">
        <h3 className="text-center pt-5">About</h3>
        <Container>
          <div className="aboutCardContain">
            <Card
              style={{ width: "100%" }}
              className="d-flex containerOfAboutCard"
            >
              <Card.Img variant="top" src="./../images/RK.png" />
              <Card.Body className="pb-4">
                <Card.Title className="muteText"><span>Online Store</span></Card.Title>
                <Card.Text>
                  Instead of going to the local malls for a shopping spree, more
                  and more people are using the variety of online resources to
                  discover the right products for them. From giants like 'RK
                  Store' to small Etsy stores, online shopping is the future of
                  consumerism! If you’re also interested in taking the plunge into
                  the e-commerce world, then an online store would be just the
                  thing. But what if you’re not sure how best to market your
                  products online?, then 'RK Store' is the best choose for you .
                </Card.Text>
              </Card.Body>
            </Card>
            <div>
              <h4 className="text-center pt-5">Contact US</h4>
              <Card style={{ width: "100%" }} className="containerOfAboutCard">
                <Card.Body>
                  <Card.Subtitle className="muteText">
                    <span>Developed By</span> Kareem Elkhooly "Front-End Developer"
                  </Card.Subtitle>
                  <Card.Text className="textOfContact">
                    To contact me, you can do that with my Email
                  </Card.Text>
                  <Card.Link href="mailto:kareemworks@hotmail.com" className="mailTo">
                    kareemworks@hotmail.com
                  </Card.Link>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
export default About;
