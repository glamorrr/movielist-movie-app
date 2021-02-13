const getCreditsYear = (credits) => {
  const years = [];
  credits.forEach(({ release_date }) => {
    years.push(release_date ? new Date(release_date).getFullYear() : 0);
  });
  return years;
};

export default getCreditsYear;
