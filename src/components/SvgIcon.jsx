const SvgIcon = (props) => {
  const { name, width, height, color = "none" } = props;
  const symbolId = `#icon-${name}`;
  return (
    <svg
      aria-hidden="true"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <use xlinkHref={symbolId} fill={color}></use>
    </svg>
  );
};

export default SvgIcon;
