import { BiDetail } from "react-icons/bi";
import {
  VuiDrawer,
  VuiFlexContainer,
  VuiFlexItem,
  VuiHorizontalRule,
  VuiIcon,
  VuiSearchResult,
  VuiSpacer,
  VuiText,
  VuiTextColor,
  VuiTitle,
  truncateEnd,
  truncateStart,
} from "../../../ui";
import { useSearchContext } from "../../../contexts/SearchContext";
import "./searchResultsDrawer.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CONTEXT_MAX_LENGTH = 200;

export const SearchResultsDrawer = ({ isOpen, onClose }: Props) => {
  const { searchValue, searchResults , filterValue, onSearch , currentIndex ,setCurrentIndex , startValue , setStartValue } = useSearchContext();
  
  return (
    <VuiDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <VuiFlexContainer
          justifyContent="spaceBetween"
          alignItems="center"
          spacing="xs"
        >
          <VuiFlexItem>
            <VuiIcon size="s">
              <BiDetail />
            </VuiIcon>
          </VuiFlexItem>

          <VuiFlexItem grow={1}>
            <VuiTitle size="s">
              <h2>Review search results</h2>
            </VuiTitle>
          </VuiFlexItem>
        </VuiFlexContainer>
      }
    >
      <VuiText size="l">
        <p>{searchValue}</p>
      </VuiText>

      <VuiSpacer size="xs" />

      <VuiHorizontalRule />

      <VuiSpacer size="m" />

      <VuiText>
        <p>
          <VuiTextColor color="subdued">
            These are all of the search results retrieved for this query. Not
            all of them will be used to generate a summary.
          </VuiTextColor>
        </p>
      </VuiText>

      <VuiSpacer size="m" />

      <div className="searchResultsDrawerResults">
        {searchResults?.map((result, index) => {
          const {
            source,
            title,
            url,
            snippet: { pre, post, text },
          } = result;

          return (
            <VuiSearchResult
              key={text}
              result={{
                title,
                url,
                snippet: {
                  pre: truncateStart(pre, CONTEXT_MAX_LENGTH),
                  text,
                  post: truncateEnd(post, CONTEXT_MAX_LENGTH),
                },
              }}
              position={startValue + index + 1}
              subTitle={
                <VuiText size="s">
                  <p>
                    <VuiTextColor color="subdued">
                    Source: {source}
                    </VuiTextColor>
                  </p>
                </VuiText>
              }
            />
          );
        })}
        
        <br />
        
        <div className="vuiFlexContainer vuiFlexContainer--alignItemsCenter vuiFlexContainer--directionRow vuiFlexContainer--justifyContentStart vuiFlexContainer--spacingNone">
          <div className="vuiFlexItem vuiFlexItem--auto vuiFlexItem--alignItemsStretch">
            <button className={`vuiBaseButton vuiButtonTertiary vuiButtonTertiary--neutral vuiBaseButton--s vuiBaseButton--alignCenter ${currentIndex === 0 ? 'vuiBaseButton-isDisabled' : ''} vuiBaseButton--left`}
            onClick={() => {
              setCurrentIndex(() => currentIndex - 1);
              setStartValue(startValue - 10);
              onSearch({ filter: filterValue , startValue: startValue - 10})         
            }}
            >
              <span className="vuiBaseButtonIconContainer">
                <div className="vuiIcon">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="vuiIcon__inner vuiIcon--inherit"
                    height={14}
                    width={14}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" />
                  </svg>
                </div>
              </span>
              Previous
            </button>
          </div>
          {Array.from({ length: 7 }, (_, index) => (
            <div className="vuiFlexItem vuiFlexItem--auto vuiFlexItem--alignItemsStretch" key={index}>
              <button
                className={`vuiBaseButton vuiButtonTertiary vuiButtonTertiary--neutral vuiBaseButton--s vuiBaseButton--alignCenter ${index === currentIndex ? 'vuiButtonTertiary-isSelected' : ''}`}
                data-testid={`paginationButton-${index + 1}`}
                onClick={() => {
                  setCurrentIndex(index);
                  setStartValue(index * 10);
                  onSearch({ filter: filterValue , startValue: index * 10})
                }}
              >
              {index + 1}
              </button>
            </div>
          ))}
          <div className="vuiFlexItem vuiFlexItem--auto vuiFlexItem--alignItemsStretch">
            <button className="vuiBaseButton vuiButtonTertiary vuiButtonTertiary--neutral vuiBaseButton--s vuiBaseButton--alignCenter vuiBaseButton--right"
             onClick={() => {
                setCurrentIndex(() => currentIndex + 1);
                setStartValue(startValue + 10);
                onSearch({ filter: filterValue , startValue: startValue + 10})
              }}
            >
              <span className="vuiBaseButtonIconContainer">
                <div className="vuiIcon">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="vuiIcon__inner vuiIcon--inherit"
                    height={14}
                    width={14}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" />
                  </svg>
                </div>
              </span>
              Next
            </button>
          </div>
        </div>
        
        
      </div>

      <VuiSpacer size="xl" />
    </VuiDrawer>
  );
};
