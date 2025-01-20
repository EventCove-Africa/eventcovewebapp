import { useNavigate, useLocation } from "react-router-dom";

type NavigateTo = string | -1;

const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const customNavigate = (to: NavigateTo, state?: object) => {
    // Add any custom logic here (e.g., logging, analytics)
    if (to === -1) {
      navigate(-1); // Go back one page
    } else {
      navigate(to, { state }); // Navigate to the specified route
    }
  };

  return {
    navigate: customNavigate,
    location, // Expose the location object for use in components
  };
};

export default useNavigation;
