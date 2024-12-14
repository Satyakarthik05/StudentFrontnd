import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Carousel from "react-bootstrap/Carousel";
import slider2 from "../../assets/slider2.jpg";
import slider3 from "../../assets/slider3.jpg";
import c1 from "../../public/AIML.png";
import c2 from "../../public/CIVIL.png";
import c3 from "../../public/CSD.jpg";
import c4 from "../../public/CSE.jpg";
import c5 from "../../public/CSM.jpg";
import c6 from "../../public/EEE.jpeg";
import c7 from "../../public/MECH.png";
import ban1 from "../../public/ban1.jpg";
import ban2 from "../../public/ban2.jpg";
import logo from "../../public/logo1.png";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const LandingPage = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <Navbar
        expanded={expanded}
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
        style={{ height: "72px" }}
      >
        <Container>
          <img src={logo} alt="" style={{ width: "35px" }} />
          <Navbar.Brand
            href="#home"
            style={{ marginLeft: "5px", fontWeight: "700" }}
          >
            BeyoundQuits
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Login" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    navigate("./orglogin");
                  }}
                >
                  Organization
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("./parentlogin");
                  }}
                >
                  Parent
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("./studlogin");
                  }}
                >
                  Student
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Carousel Section */}
      <section
        id="carousel"
        className="mt-3"
        style={{
          width: "90%",
          margin: "auto",
          height: "70vh",
          borderRadius: "20px",
        }}
      >
        <Carousel style={{ marginTop: "10%" }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slider2} // Replace with your image path
              alt="Second slide"
              style={{ height: "80vh", borderRadius: "20px" }}
            />
            <Carousel.Caption>
              <h3>Explore Departments</h3>
              <p>Discover the opportunities available for you.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slider3} // Replace with your image path
              alt="Second slide"
              style={{ height: "80vh", borderRadius: "20px" }}
            />
            <Carousel.Caption>
              <h3>Explore Departments</h3>
              <p>Discover the opportunities available for you.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-5 bg-light mt-2 ">
        <div className="container" style={{ marginTop: "8%" }}>
          <h2>About Us</h2>
          <p style={{ fontSize: "18px" }} className="mt-5">
            SRAT is dedicated to connecting students with their ideal academic
            path. Our platform offers resources and guidance to help you make
            informed decisions. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Omnis veniam aspernatur ab mollitia accusantium
            sunt non eaque natus? Cumque distinctio incidunt eum dignissimos,
            fuga odio consequuntur sed nesciunt debitis ullam! Voluptatibus
            similique fugit delectus dolores iusto magnam voluptatem aliquid.
            Enim sapiente ad impedit laboriosam eius culpa ducimus eum id
            ratione vero minus voluptate nam saepe deleniti obcaecati, voluptas
            rem corporis? Possimus, officia fuga. Dolorum eveniet expedita iusto
            quia laborum ipsum qui, perferendis facilis amet consequuntur.
            Labore est molestiae, itaque quod culpa dolore quaerat officia
            deleniti at! Ad expedita numquam fugit! A maiores, accusamus eum,
            consequatur nihil illo enim perspiciatis id facere excepturi
            reiciendis ab culpa incidunt laudantium porro eligendi? Tempore vero
            in, fuga enim minima odio natus blanditiis optio recusandae.
            Blanditiis eveniet, minima temporibus, sapiente totam deserunt,
            itaque repellat veniam beatae unde neque accusantium? Illo, quod.
            Distinctio doloremque dolorem in aspernatur sed ipsa, quae facilis
            ut illum! Mollitia, facere voluptatibus? Veniam quos libero magnam
            neque laborum quae distinctio quod quisquam sequi dolorum vitae
            fugit vero cupiditate, perferendis similique. Voluptate, id labore.
            Itaque qui voluptatum nihil exercitationem, labore iste quisquam.
            Recusandae?
          </p>
        </div>
        <div
          className="container text-white mt-5"
          style={{ backgroundColor: "#2C2C54", padding: "20px" }}
        >
          <div className="row mb-5">
            <div className="col-md-6 text-center m-auto">
              <h2>Learning Courses</h2>
              <h1>Practical, Job-Relevant Topics</h1>
              <p>
                From Python to web development, you'll master{" "}
                <strong>concepts that employers demand</strong>, ensuring your
                smooth transition from beginner to professional.
              </p>
            </div>
            <div className="col-md-6">
              <img src={ban1} alt="Course Catalog" className="img-fluid" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img src={ban2} alt="In Browser IDE" className="img-fluid" />
            </div>
            <div className="col-md-6 text-center m-auto">
              <h2>In Browser IDE</h2>
              <h1>Hands-On Learning Experience</h1>
              <p>
                Practice as you learn with our <strong>built-in IDE</strong>.
                Each lesson is designed to be followed by a coding exercise to
                apply the concepts and gain immediate feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-5">
        <div className="container">
          <h2>Departments</h2>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "20px",
              padding: "10px",
            }}
          >
            <div className="card" style={{ width: "250px", flex: "0 0 auto" }}>
              <img className="card-img-top" src={c1} alt="Card image cap" />
              <div className="card-body">
                <h1>AIML</h1>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="card" style={{ width: "250px", flex: "0 0 auto" }}>
              <img className="card-img-top" src={c2} alt="Card image cap" />
              <div className="card-body">
                <h1>CIVIL</h1>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="card" style={{ width: "250px", flex: "0 0 auto" }}>
              <img className="card-img-top" src={c3} alt="Card image cap" />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="card" style={{ width: "250px", flex: "0 0 auto" }}>
              <img className="card-img-top" src={c4} alt="Card image cap" />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="card" style={{ width: "250px", flex: "0 0 auto" }}>
              <img className="card-img-top" src={c5} alt="Card image cap" />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="card" style={{ width: "250px", flex: "0 0 auto" }}>
              <img className="card-img-top" src={c6} alt="Card image cap" />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="card" style={{ width: "250px", flex: "0 0 auto" }}>
              <img className="card-img-top" src={c7} alt="Card image cap" />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer
        className="text-white py-4"
        style={{ backgroundColor: "#101535" }}
      >
        <div className="container">
          <div className="row">
            {/* Quick Links */}
            <div className="col-md-3 col-sm-6 mb-3">
              <h5 className="text-warning">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Services
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="col-md-3 col-sm-6 mb-3">
              <h5 className="text-warning">Follow Us</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-md-3 col-sm-6 mb-3">
              <h5 className="text-warning">Contact</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="mailto:info@example.com" className="text-white">
                    info@example.com
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="text-white">
                    +1 234 567 890
                  </a>
                </li>
                <li>123 Address St, City, Country</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-md-3 col-sm-6 mb-3">
              <h5 className="text-warning">Newsletter</h5>
              <form>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
                <button type="submit" className="btn btn-warning mt-3 w-100">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="text-center mt-3">
            <p>© 2024 BeyoundQuits. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
