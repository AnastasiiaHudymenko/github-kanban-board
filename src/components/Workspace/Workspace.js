import markup from './markup';

const Workspace = ({ actualNotate, handleChange, updateNote, newNotate }) => {
  return markup(actualNotate, handleChange, updateNote, newNotate);
};

export default Workspace;
