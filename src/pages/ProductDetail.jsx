import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Button,
  Image,
  Spin,
  Divider,
  Descriptions,
  Rate,
  message,
} from "antd";
import { DollarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

const { Title, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        message.error("Failed to load product details.");
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[var(--bg-color)]">
        <Spin size="large" />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-color)] p-6"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative max-w-[1280px] p-8 max-w-2xl w-full shadow-2xl rounded-2xl"
        style={{
          backgroundColor: "var(--card-bg)",
          color: theme === "dark" ? "#ffffff" : "var(--card-text)",
          padding: "24px",
          borderRadius: "12px",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center mb-6"
        >
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="rounded-lg shadow-lg object-cover"
            preview={{ mask: "Click to zoom" }}
          />
        </motion.div>

        <Title
          level={2}
          className="text-center font-extrabold tracking-wide"
          style={{ color: theme === "dark" ? "#ffffff" : "var(--card-text)" }}
        >
          {product.title}
        </Title>

        <div className="flex flex-col items-center my-3">
          <Rate
            allowHalf
            defaultValue={product.rating?.rate}
            className="text-xl"
          />
          <Text
            className="mt-2 text-lg"
            style={{ color: theme === "dark" ? "#ffffff" : "#6b7280" }}
          >
            {product.rating?.rate} / 5 ({product.rating?.count} reviews)
          </Text>
        </div>

        <Divider
          style={{ borderColor: theme === "dark" ? "#ffffff40" : "gray" }}
        />

        <Descriptions
          title="Product Details"
          column={1}
          bordered
          labelStyle={{
            color: theme === "dark" ? "#ffffff" : "var(--card-text)",
          }}
        >
          <Descriptions.Item label="Category">
            <Text
              style={{
                color: theme === "dark" ? "#ffffff" : "var(--card-text)",
              }}
            >
              {product.category}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            <Text
              style={{
                color: theme === "dark" ? "#ffffff" : "var(--card-text)",
              }}
            >
              {product.description}
            </Text>
          </Descriptions.Item>
        </Descriptions>

        <Divider
          style={{ borderColor: theme === "dark" ? "#ffffff40" : "gray" }}
        />

        <div className="flex justify-center items-center my-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            <Title
              level={3}
              className="text-transparent bg-clip-text font-bold"
              style={{
                color: theme === "dark" ? "#ffffff" : "var(--card-text)",
              }}
            >
              <DollarOutlined /> {product.price}
            </Title>
          </motion.div>
        </div>

        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center"
        >
          <Button
            type="primary"
            size="large"
            icon={<ShoppingCartOutlined />}
            onClick={() => message.success("Product added to cart!")}
            style={{
              backgroundColor: "var(--card-price)",
              borderColor: "var(--card-price)",
              color: "#ffffff",
            }}
          >
            Buy Now
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetail;
