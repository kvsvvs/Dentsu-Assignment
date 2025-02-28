import React from "react";
import { Card, Typography, Tooltip } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      hoverable
      className="product-card"
      onClick={handleCardClick}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "12px",
        padding: "16px",
        backgroundColor: "var(--card-bg)",
        color: "var(--card-text)",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        cursor: "pointer",
        border: "1px solid var(--card-border, rgba(255,255,255,0.1))",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0px 6px 20px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.1)";
      }}
    >
      <div
        style={{
          width: "100%",
          height: "200px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "var(--card-bg)",
          borderRadius: "8px",
          position: "relative",
        }}
      >
        <img
          alt={product.title}
          src={product.image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
            borderRadius: "8px",
          }}
          loading="lazy"
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "4px 10px",
            borderRadius: "6px",
            color: "#fff",
            fontSize: "0.9rem",
            fontWeight: "bold",
          }}
        >
          {product.category.toUpperCase()}
        </div>
      </div>

      <Tooltip title={product.title} placement="top">
        <Text
          strong
          className="truncate"
          style={{
            textAlign: "center",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            color: "var(--card-text)",
            fontSize: "1.2rem",
            fontWeight: "bold",
            letterSpacing: "0.5px",
            lineHeight: "1.5rem",
            marginTop: "1rem",
            padding: "0 8px",
            maxHeight: "3rem",
          }}
        >
          {product.title}
        </Text>
      </Tooltip>

      <Text
        strong
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          letterSpacing: "1px",
          background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginTop: "0.75rem",
          transition: "text-shadow 0.3s ease-in-out",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.textShadow =
            "0px 0px 10px rgba(255,126,95,0.8)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.textShadow = "none")}
      >
        <DollarOutlined style={{ color: "var(--card-text)" }} /> {product.price}
      </Text>
    </Card>
  );
};

export default ProductCard;
