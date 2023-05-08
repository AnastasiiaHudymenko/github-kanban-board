const ListItem = ({ notate, handleClickActualNotate }) => {
  const elements = notate.map(({ id, title, desc, date }) => (
    <li key={id} onClick={() => handleClickActualNotate(id)}>
      <span>{date}</span>
      <h2>{title}</h2>
      <p>{desc}</p>
    </li>
  ));

  return <ul>{elements}</ul>;
};

export default ListItem;
