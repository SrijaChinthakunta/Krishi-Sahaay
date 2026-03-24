import { useNavigate } from "react-router-dom";
import photo from "../assets/srija.jpeg";

function About() {

  const navigate = useNavigate();

  return (
    <div style={main}>

      {/* HOME BUTTON */}
      <button onClick={() => navigate("/")} style={homeBtn}>
        ⬅ Home
      </button>

      <div style={card}>

        <img src={photo} alt="Srija" style={img} />

        <h1 style={title}>Srija Chinthakunta</h1>

        <p style={desc}>
          Krishi Sahaay was built with love for my father and for farmers like him.
          This app aims to make farming smarter using AI — from crop advice to
          disease detection — all in one place.
        </p>

        <p style={desc}>
          Farmers work hard every day to feed the nation. This is my small step
          to support them using technology 💚
        </p>

        <p style={highlight}>
          🌾 Built for real farmers. Inspired by my dad.
        </p>

        {/* SOCIAL LINKS */}
        <div style={links}>

          <a
            href="https://www.linkedin.com/in/srija-chinthakunta-932ba3317"
            target="_blank"
            style={link}
          >
            🔗 LinkedIn
          </a>

          <a
            href="https://github.com/SrijaChinthakunta"
            target="_blank"
            style={link}
          >
            💻 GitHub
          </a>

          <a
            href="mailto:siri240807@gmail.com"
            style={link}
          >
            📧 Email
          </a>

        </div>

      </div>

    </div>
  );
}

export default About;

/* ========================= */

const main = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#c8f7c5,#7bd389)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  position: "relative"
};

const card = {
  backdropFilter: "blur(25px)",
  background: "rgba(255,255,255,0.3)",
  borderRadius: "30px",
  padding: "40px",
  textAlign: "center",
  maxWidth: "500px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
};

const img = {
  width: "150px",
  borderRadius: "50%",
  marginBottom: "20px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
};

const title = {
  fontSize: "28px",
  marginBottom: "10px"
};

const desc = {
  fontSize: "16px",
  marginBottom: "15px",
  lineHeight: "1.6"
};

const highlight = {
  fontSize: "16px",
  marginTop: "10px",
  fontWeight: "bold",
  color: "#1b5e20"
};

const links = {
  marginTop: "25px",
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const link = {
  textDecoration: "none",
  padding: "12px",
  borderRadius: "12px",
  background: "#1b5e20",
  color: "white",
  fontSize: "16px",
  transition: "0.3s"
};

const homeBtn = {
  position: "absolute",
  top: "20px",
  left: "20px",
  padding: "10px 15px",
  borderRadius: "10px",
  border: "none",
  background: "#1b5e20",
  color: "white",
  cursor: "pointer"
};