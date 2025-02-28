import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Spin, Alert, Button, Row, Col } from "antd";

const ITEMS_TO_SHOW = 8;

const ProductList = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);
  const currentPageRef = useRef(1);

  const loadProducts = useCallback(async () => {
    if (loading || searchTerm.length > 0) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const allProducts = response.data;

      let start = (currentPageRef.current - 1) * ITEMS_TO_SHOW;
      let end = currentPageRef.current * ITEMS_TO_SHOW;
      let newProducts = allProducts.slice(start, end);

      if (newProducts.length === 0) {
        currentPageRef.current = 1;
        start = 0;
        end = ITEMS_TO_SHOW;
        newProducts = allProducts.slice(start, end);
      }

      setProducts((prev) => [...prev, ...newProducts]);

      currentPageRef.current += 1;
      setHasMore(true);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [loading, searchTerm]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      loadProducts();
    }
  }, [searchTerm, loadProducts]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    if (loading || searchTerm.length > 0 || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadProducts();
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading, searchTerm, hasMore, loadProducts]);

  const handleRetry = () => {
    setError(null);
    loadProducts();
  };

  return (
    <div>
      {filteredProducts.length === 0 && !loading && !error && (
        <div className="text-center text-gray-600 dark:text-gray-300">
          No products found.
        </div>
      )}

      {filteredProducts.length > 0 && (
        <Row gutter={[24, 24]} justify="center">
          {filteredProducts.map((product, index) => (
            <Col
              key={`${product.id}-${index}`}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
            >
              <ProductCard product={product} />
            </Col>
          ))}

          <Col span={24}>
            <div ref={loadMoreRef} style={{ height: "20px" }} />
          </Col>
        </Row>
      )}

      {error && (
        <div className="flex flex-col justify-center items-center my-4">
          <Alert message={error} type="error" className="mb-4" />
          <Button type="primary" onClick={handleRetry}>
            Retry
          </Button>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center my-4">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default ProductList;
