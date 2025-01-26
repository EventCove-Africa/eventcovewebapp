import { useNavigate, useLocation } from "react-router-dom";

type NavigateTo = string;

const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const customNavigate = (to: NavigateTo, state?: object) => {
    // Add any custom logic here (e.g., logging, analytics)
    navigate(to, { state }); // Navigate to the specified route
  };

  return {
    navigate: customNavigate,
    location, // Expose the location object for use in components
  };
};

export default useNavigation;
