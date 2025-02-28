import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";
import useDebounce from "../hooks/useDebounce";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

const Home = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <Layout className="app-layout">
      <Header
        className="header fixed top-0 w-full z-10 shadow-md bg-[var(--header-bg)] transition-all"
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 12px",
        }}
      >
        <h1
          className="m-0 font-bold text-sm sm:text-base md:text-xl lg:text-2xl text-[var(--text-color)] whitespace-nowrap"
          style={{
            transition: "font-size 0.3s ease-in-out",
          }}
        >
          Product Gallery
        </h1>

        <div className="flex items-center w-3/5 sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[320px]">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />
        </div>
      </Header>

      <Content className="content" style={{ padding: "100px 24px 24px" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <ProductList searchTerm={debouncedSearch} />
        </div>
      </Content>

      <Footer className="footer" style={{ textAlign: "center" }}>
        &copy; {new Date().getFullYear()} Your Company Name. All Rights
        Reserved.
      </Footer>
    </Layout>
  );
};

export default Home;
