import { useEffect, useState } from "react";

function Schemes() {

  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    const response = await fetch("https://krishi-backend-bx6e.onrender.com/schemes");
    const data = await response.json();
    setSchemes(data.available_schemes);
  };

  return (
    <div style={main}>

      <h1 style={title}>🏛 Government Schemes</h1>

      <div style={grid}>
        {schemes.map((scheme, index) => (
          <div key={index} style={card}>

            <h2 style={schemeTitle}>{scheme.name}</h2>
            <p style={desc}>{scheme.description}</p>

            <p style={eligibility}>
              <b>Eligibility:</b> {scheme.eligibility}
            </p>

            <a href={scheme.link} target="_blank" style={link}>
              View Scheme →
            </a>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Schemes;

/* ===== STYLES ===== */

const main = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#c8f7c5,#7bd389)",
  padding: "60px",
  textAlign: "center"
};

const title = {
  fontSize: "32px",
  marginBottom: "30px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "30px",
  maxWidth: "1100px",
  margin: "auto"
};

const card = {
  backdropFilter: "blur(20px)",
  background: "rgba(255,255,255,0.35)",
  borderRadius: "25px",
  padding: "30px",
  fontSize: "18px",
  textAlign: "left",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
};

const schemeTitle = {
  fontSize: "22px",
  marginBottom: "10px"
};

const desc = {
  marginBottom: "10px"
};

const eligibility = {
  marginBottom: "15px"
};

const link = {
  color: "#1b5e20",
  fontWeight: "bold",
  textDecoration: "none"
};