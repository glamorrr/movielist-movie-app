const PersonIdentity = ({ person }) => {
  const { known_for_department, gender, birthday, deathday, age, place_of_birth } = person;

  const identities = [
    { title: 'Known For', content: known_for_department },
    { title: 'Gender', content: gender },
    { title: 'Date of Birth', content: birthday && !deathday ? `${birthday} (${age})` : birthday },
    { title: 'Day of Death', content: deathday ? `${person.deathday} (${person.age})` : '' },
    { title: 'Place of Birth', content: place_of_birth },
  ];

  return (
    <div className="text-gray-700 font-poppins">
      {identities.map(({ title, content }) => {
        if (!content) return;
        return (
          <p key={title}>
            <span className="font-semibold">{title}: </span>
            {content}
          </p>
        );
      })}
    </div>
  );
};

export default PersonIdentity;
