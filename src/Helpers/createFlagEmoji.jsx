function createFlagEmoji(letterCode) {
  const countryFlag = letterCode?.toLowerCase();

  return (
    <img
      style={{ width: "24px", height: "18px" }}
      src={`https://flagcdn.com/${countryFlag}.svg`}
      alt={countryFlag}
    />
  );
}

export default createFlagEmoji;
