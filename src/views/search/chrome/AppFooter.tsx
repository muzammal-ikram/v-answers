import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiTitle,
  VuiText,
  VuiLink,
  VuiSpacer,
  // VuiButtonPrimary,
} from "../../../ui";
import "./appFooter.scss";

export const AppFooter = () => {
  return (
    <div className="appFooter">
      <div className="appFooterContent">
        <VuiFlexContainer
          alignItems="start"
          spacing="l"
          className="appFooterContent__layout"
        >
          <VuiFlexItem grow={5}>
            <VuiTitle size="s">
              <h3>Just an example of what's possible</h3>
            </VuiTitle>

            <VuiSpacer size="m" />

            <VuiText>
              <p>
                We made this to show off VA Research Bot's conversational search
                capabilities. But you can use VA Research Bot to ask your own data
                questions, too. VA Research Bot is free to use so it's easy to get
                started.
              </p>
            </VuiText>

            <VuiSpacer size="m" />

          </VuiFlexItem>

          <VuiFlexItem grow={5}>
            <VuiTitle size="s">
              <h3>A conversational search API platform</h3>
            </VuiTitle>

            <VuiSpacer size="m" />

             

            <VuiSpacer size="s" />

          </VuiFlexItem>
        </VuiFlexContainer>
      </div>
    </div>
  );
};
