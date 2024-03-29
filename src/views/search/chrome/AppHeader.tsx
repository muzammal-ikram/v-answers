import ReactGA from "react-ga4";
import { useAuthenticationContext } from "../../../contexts/AuthenticationContext";
import { useConfigContext } from "../../../contexts/ConfigurationContext";
import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiTitle,
  VuiTextColor,
  VuiButtonTertiary,
  VuiText,
  // VuiButtonPrimary,
} from "../../../ui";
import "./appHeader.scss";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const AppHeader = () => {
  const { app, appHeader } = useConfigContext();

  const navigate = useNavigate();
  const { isAuthEnabled, logOut, user } = useAuthenticationContext();
  return (
    <div className="appHeader">
      <VuiFlexContainer justifyContent="spaceBetween" alignItems="center">
        <VuiFlexItem grow={1}>
          <VuiFlexContainer alignItems="center" wrap={true} spacing="xxs">
            <VuiFlexItem>
              {/* We want this disabled so we can track outbound links. Enabling
          this would add the rel="noopener noreferrer" attribute to the
          link. */}
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a className="appHeaderLogo" rel="noreferrer">
                <img
                  src={appHeader.logo.src ?? "images/casescribe.png"}
                  alt={appHeader.logo.alt ?? "VA Research Bot logo"}
                  height={appHeader.logo.height ?? "20"}
                  style={{ marginTop: "1px" }}
                />
              </a>
            </VuiFlexItem>

            <VuiFlexItem grow={1}>
              <VuiTitle size="xs" align="left">
                <VuiTextColor color="subdued">
                  <h1>{app.title ?? "VA Research Bot App"}</h1>
                </VuiTextColor>
              </VuiTitle>
            </VuiFlexItem>
          </VuiFlexContainer>
        </VuiFlexItem>

        <VuiFlexItem grow={false}>
          <VuiFlexContainer justifyContent="spaceBetween" alignItems="center">
            {isAuthEnabled && (
              <>
                <VuiFlexItem grow={false}>
                  <VuiText size="s">
                    <p>Logged in as {user?.email}</p>
                  </VuiText>
                </VuiFlexItem>
                <div className="vuiFlexItem vuiFlexItem--auto vuiFlexItem--alignItemsStretch">
                  <Link
                  to={"/dashboard"}
                    className="vuiBaseButton fs-mask vuiButtonSecondary vuiButtonSecondary--primary vuiBaseButton--m vuiBaseButton--alignCenter vuiBaseButton--left"
                    type="button"
                    data-testid="accountMenuButton"
                    style={{ textDecoration: "none" }}
                  >
                    Dashboard
                  </Link>
                </div>

                <VuiFlexItem>
                  <VuiButtonTertiary color="neutral" size="m" onClick={() => {
                    logOut();
                    navigate('/signin')
                  }}>
                    Log out
                  </VuiButtonTertiary>
                </VuiFlexItem>
              </>
            )}

            {appHeader.learnMore.link && (
              <VuiFlexItem>
                <VuiButtonTertiary
                  color="primary"
                  size="m"
                  href={appHeader.learnMore.link}
                  target="_blank"
                  onClick={() => {
                    ReactGA.event({
                      category: "Outbound link",
                      action: "click",
                      label: "Learn more",
                    });
                  }}
                >
                  {appHeader.learnMore.text ?? "About"}
                </VuiButtonTertiary>
              </VuiFlexItem>
            )}

            <VuiFlexItem>
            </VuiFlexItem>
          </VuiFlexContainer>
        </VuiFlexItem>
      </VuiFlexContainer>
    </div>
  );
};
