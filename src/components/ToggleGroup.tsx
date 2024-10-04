import React, { useEffect } from "react";

type Props = {
  value: number;
  setValue: Function;
};

const ToggleGroup: React.FC<Props> = ({ setValue, value }) => {
  useEffect(() => {
    document
      .querySelector(".toggle-group-item.active")
      ?.classList.remove("active");

    document.getElementById(value.toString())?.classList.add("active");
  }, [value]);

  return (
    <ul className="toggle-group-container">
      <button onClick={() => setValue(0)} id="0" className="toggle-group-item">
        Video
      </button>
      <button onClick={() => setValue(1)} id="1" className="toggle-group-item">
        Only Audio
      </button>
    </ul>
  );
};

export default ToggleGroup;
