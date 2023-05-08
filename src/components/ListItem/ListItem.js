const ListItem = ({ notate, handleClickActualNotate }) => {
  const elements = notate.map(({ id, note, date }) => (
    <li key={id} onClick={() => handleClickActualNotate(id)}>
      <span>{date}</span>

      <pre>{note}</pre>
    </li>
  ));

  return elements;
};

export default ListItem;
