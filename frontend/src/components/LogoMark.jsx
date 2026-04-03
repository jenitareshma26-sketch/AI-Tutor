function LogoMark({ size = 40, className = "" }) {
  return (
    <img
      aria-hidden="true"
      alt=""
      src="/logo.png"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}

export default LogoMark;