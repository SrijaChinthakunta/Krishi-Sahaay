import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div style={bg}>

      <div style={container}>

        <h1 style={logo}>🌾 Krishi Sahaay</h1>
        <p style={tagline}>AI Support for Every Farmer 🌿</p>

        <div style={grid}>

          <div style={card} onClick={() => navigate("/ask")}>
            <div style={icon}>🤖</div>
            <h2>Ask AI</h2>
            <p>Smart farming assistant</p>
          </div>

          <div style={card} onClick={() => navigate("/detect")}>
            <div style={icon}>🌿</div>
            <h2>Disease Detection</h2>
            <p>Scan crops instantly</p>
          </div>

          <div style={card} onClick={() => navigate("/schemes")}>
            <div style={icon}>🏛</div>
            <h2>Schemes</h2>
            <p>Government support</p>
          </div>

          <div style={card} onClick={() => navigate("/about")}>
            <div style={icon}>👩‍💻</div>
            <h2>About</h2>
            <p>Made with love 💚</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;

/* ===== STYLES ===== */

const bg = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#c8f7c5,#7bd389)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const container = {
  width: "95%",
  maxWidth: "1200px",
  padding: "50px",
  textAlign: "center"
};

const logo = {
  fontSize: "42px",
  marginBottom: "10px"
};

const tagline = {
  fontSize: "20px",
  marginBottom: "40px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "30px"
};

const card = {
  backdropFilter: "blur(25px)",
  background: "rgba(255,255,255,0.25)",
  borderRadius: "25px",
  padding: "40px",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
};

const icon = {
  fontSize: "50px",
  marginBottom: "15px"
};