import PropTypes from 'prop-types';
import React from 'react';

const EditorPanel = ({
  obsStory,
  updateSection,
}) => {

  const avoidEnter = (e) => {
    // avoiding enter key for the Header
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      return false;
    }
  };
  return (
    <>
      {obsStory.map((story, index) => (
        <React.Fragment key={story.id}>
          {Object.prototype.hasOwnProperty.call(story, 'title')
            && (
              <div
                className="flex m-4 p-1 rounded-md min-h-0"
                key={story.id}
              >
                <textarea
                  cols={120}
                  name={story.title}
                  onChange={e => updateSection(e.target.value, story.id)}
                  onKeyDown={avoidEnter}
                  value={story.title}
                  data-id={story.id}
                  className="flex-grow text-justify ml-2 p-2 text-xl"
                />
              </div>
            )}
          {Object.prototype.hasOwnProperty.call(story, 'text')
            && (
              <div
                className="flex m-4 p-1 rounded-md"
                key={story.id}
              >
                <span className="w-5 h-5 bg-gray-800 rounded-full flex justify-center text-sm text-white items-center p-3 ">
                </span>
                <textarea
                  cols={120}
                  name={story.text}
                  onChange={e => updateSection(e.target.value, story.id)}
                  onKeyDown={avoidEnter}
                  value={story.text}
                  data-id={story.id}
                  className="flex-grow text-justify ml-2 p-2 text-sm"
                />
              </div>
            )}
          {Object.prototype.hasOwnProperty.call(story, 'end')
            && (
              <div
                className="flex m-4 p-1 rounded-md min-h-0"
                key={story.id}
              >
                <textarea
                  cols={120}
                  name={story.end}
                  onChange={e => updateSection(e.target.value, story.id)}
                  onKeyDown={avoidEnter}
                  value={story.end}
                  data-id={story.id}
                />
              </div>
            )}
        </React.Fragment>
      ))}
    </>
  );
};
export default EditorPanel;
EditorPanel.propTypes = {
  obsStory: PropTypes.array,
  storyUpdate: PropTypes.func,
};
