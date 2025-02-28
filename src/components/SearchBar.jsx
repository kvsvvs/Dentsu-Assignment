import React, { useContext } from "react";
import { Input, Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext";

const SearchBar = ({ value, onChange, placeholder = "Search products..." }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center gap-4 w-full max-w-lg mx-auto px-4 md:gap-6">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size="large"
        className="rounded-full px-3 py-2 shadow-md w-full text-base md:text-lg"
        style={{
          backgroundColor: "var(--card-bg)",
          color: "var(--card-text)",
          border: `2px solid ${theme === "dark" ? "#ffffff55" : "#00000022"}`,
          transition: "all 0.3s ease-in-out",
        }}
      />

      <div className="ml-2 md:ml-3">
        <Switch
          checked={theme === "dark"}
          onChange={toggleTheme}
          checkedChildren={<MoonOutlined style={{ color: "#ffffff" }} />}
          unCheckedChildren={<SunOutlined style={{ color: "#f59e0b" }} />}
          className="w-12 h-6 md:w-16 md:h-8 rounded-full flex items-center transition-all"
          style={{
            backgroundColor: theme === "dark" ? "#444" : "#ddd",
            border: `1px solid ${theme === "dark" ? "#ffffff55" : "#00000022"}`,
            boxShadow:
              theme === "dark"
                ? "0px 0px 10px #ffffff33"
                : "0px 0px 10px #00000022",
            transition: "all 0.3s ease-in-out",
            marginLeft: "12px",
          }}
        />
      </div>

      <style>
        {`
          .ant-input::placeholder {
            color: ${theme === "dark" ? "#ffffffaa" : "#555555"};
            transition: color 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default SearchBar;
