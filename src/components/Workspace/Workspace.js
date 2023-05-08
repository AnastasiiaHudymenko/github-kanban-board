import markup from './markup';

const Workspace = ({ actualNotate, handleChange }) => {
  return markup(actualNotate, handleChange);
};

export default Workspace;
