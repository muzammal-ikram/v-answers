import { GoogleLogin } from "@react-oauth/google";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { VuiFlexContainer, VuiFlexItem, VuiText, VuiTextColor, VuiTitle } from "../../ui";
import "./loggedOutView.scss";
import { useConfigContext } from "../../contexts/ConfigurationContext";
import { useNavigate } from "react-router";

export const LoggedOutView = () => {
  const { searchHeader } = useConfigContext();
  const { logIn } = useAuthenticationContext();
  const navigate = useNavigate();

  return (
    <VuiFlexContainer
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing="l"
      className="loggedOutView"
    >
      {searchHeader.logo.src && (
        <VuiFlexItem>
          <img src={searchHeader.logo.src} alt={searchHeader.logo.alt} height={searchHeader.logo.height} />
        </VuiFlexItem>
      )}

      {searchHeader.title && (
        <VuiFlexItem grow={false}>
          <VuiTitle size="m">
            <h2>
              <strong>{searchHeader.title}</strong>
            </h2>
          </VuiTitle>
        </VuiFlexItem>
      )}

      <VuiFlexItem>
        <VuiText align="center">
          <VuiTextColor color="subdued">Join us with Google</VuiTextColor>
        </VuiText>
      </VuiFlexItem>

      <VuiFlexItem>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse , '@credentialResponse');
            logIn(credentialResponse.credential);
            navigate("/search");
          }}
          onError={() => { 
            console.error("Login Failed");
          }}
        />
      </VuiFlexItem>
    </VuiFlexContainer>
  );
};
