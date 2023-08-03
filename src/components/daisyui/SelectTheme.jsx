import themes from "@/configs/themes";

const SelectTheme = () => {
  const toggleTheme = (e) => {
    window.localStorage.setItem("theme", e.target.value);
    document.documentElement.setAttribute("data-theme", e.target.value);
  };

  return (
    <select
      className="select select-bordered w-full max-w-xs"
      onChange={toggleTheme}
      defaultValue={window.localStorage.getItem("theme") || "dark"}
    >
      {themes.map((theme) => (
        <option className="font-bold" key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
};

export default SelectTheme;
