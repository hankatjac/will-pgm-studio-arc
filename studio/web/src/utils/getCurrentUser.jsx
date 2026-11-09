const getCurrentUser = () => {
  try {
    // Check localStorage first
    const userFromLocalStorage = localStorage.getItem("currentUser");
    if (userFromLocalStorage) {
      return JSON.parse(userFromLocalStorage);
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  // Return null if no user is found
  return null;
};

export default getCurrentUser;
