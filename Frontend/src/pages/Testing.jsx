import { useUser } from "../context/UserContext"; // adjust the path if needed

const Testing = () => {
  const { user } = useUser(); // Access user from context
  console.log(user); // Log the user object to the console

  return (
    <div>
      <h3>User Data from Context:</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre> {/* Display user object */}
    </div>
  );
};

export default Testing;
