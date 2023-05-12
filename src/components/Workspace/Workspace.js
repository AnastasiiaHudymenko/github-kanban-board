import markup from './markup';

const Workspace = ({
  actualNotate,
  handleChange,
  updateNote,
  newNotate,
  filterdNote,
  userlockedNote,
}) => {
  return markup(
    actualNotate,
    handleChange,
    updateNote,
    newNotate,
    filterdNote,
    userlockedNote
  );
};

export default Workspace;
