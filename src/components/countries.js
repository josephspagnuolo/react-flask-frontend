const CountryInput = ({ value, setter }) => {
  const countries = [
    { label: "Canada", src: "/canada.svg" },
    { label: "USA", src: "/usa.svg" },
  ];

  return (
    <ul className="countries">
      {countries.map((country, index) => (
        <li key={index} className={(value === country.label) ? "country_checked" : "country"}
        onClick={() => {
            if (value === country.label)
              setter("");
            else
              setter(country.label);
          }
        }>
          <img alt={country.label} src={country.src} width={100}></img>
          <span className="">
            {country.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default CountryInput;
