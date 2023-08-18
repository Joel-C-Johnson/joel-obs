import "core-js/modules/es.array.map.js";
import PropTypes from 'prop-types';
import React from 'react';
// import { useContext } from 'react';
// import { useTranslation } from 'react-i18next';
// import { mdToJson } from '../../utils/mdToJson';

// console.log("sssssssssssss", )

var EditorPanel = function EditorPanel(_ref) {
  var _ref$obsStory = _ref.obsStory,
    obsStory = _ref$obsStory === void 0 ? [] : _ref$obsStory,
    updateSection = _ref.updateSection;
  // console.log("ssssssssssssssssssssssss", obsStory)

  //       const {
  //     state: {
  //       selectedFont,
  //       fontSize,
  //     },
  //     actions: {
  //       setSelectedStory,
  //     },
  // } = useContext(ReferenceContext);

  //   const { states: { scrollLock } } = useContext(ProjectContext);

  //   const { t } = useTranslation();

  // const handleChange = (e) => {
  //   const index = e.target.getAttribute('data-id');
  //   const value = (e.target.value).toString().replace(/[\n\r]/gm, '');
  //   const story = obsStory[index - 1];
  //   let newStory = {};
  //   if (Object.prototype.hasOwnProperty.call(story, 'title')) {
  //     newStory = {
  //       id: story.id,
  //       title: value,
  //     };
  //   } else if (Object.prototype.hasOwnProperty.call(story, 'text')) {
  //     newStory = {
  //       id: story.id,
  //       img: story.img,
  //       text: value,
  //     };
  //   } else if (Object.prototype.hasOwnProperty.call(story, 'end')) {
  //     newStory = {
  //       id: story.id,
  //       end: value,
  //     };
  //   }

  //   const newStories = obsStory.map((story) => (story.id !== newStory.id ? story : newStory));
  //   let newData = { ...obsStory };
  //   newData = newStories;
  //   storyUpdate(newData);
  // };
  var avoidEnter = function avoidEnter(e) {
    // avoiding enter key for the Header
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      return false;
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, obsStory.map(function (story, index) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: story.id
    }, Object.prototype.hasOwnProperty.call(story, 'title') && /*#__PURE__*/React.createElement("div", {
      className: "flex m-4 p-1 rounded-md min-h-0",
      key: story.id
    }, /*#__PURE__*/React.createElement("textarea", {
      cols: 120,
      name: story.title,
      onChange: function onChange(e) {
        return updateSection(e.target.value, story.id);
      },
      onKeyDown: avoidEnter
      //   onClick={() => setSelectedStory(scrollLock === true ? 0 : story.id)}
      ,
      value: story.title,
      "data-id": story.id,
      className: "flex-grow text-justify ml-2 p-2 text-xl"
      //   style={{
      //     fontFamily: selectedFont || 'sans-serif',
      //     fontSize: `${fontSize}rem`,
      //   }}
    })), Object.prototype.hasOwnProperty.call(story, 'text') && /*#__PURE__*/React.createElement("div", {
      className: "flex m-4 p-1 rounded-md",
      key: story.id
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-5 h-5 bg-gray-800 rounded-full flex justify-center text-sm text-white items-center p-3 "
    }), /*#__PURE__*/React.createElement("textarea", {
      cols: 120,
      name: story.text,
      onChange: function onChange(e) {
        return updateSection(e.target.value, story.id);
      },
      onKeyDown: avoidEnter
      //   onClick={() => setSelectedStory(scrollLock === true ? 0 : story.id)}
      ,
      value: story.text,
      "data-id": story.id,
      className: "flex-grow text-justify ml-2 p-2 text-sm"
      //   style={{
      //     fontFamily: selectedFont || 'sans-serif',
      //     fontSize: `${fontSize}rem`,
      //     lineHeight: (fontSize > 1.3) ? 1.5 : '',
      //   }}
    })), Object.prototype.hasOwnProperty.call(story, 'end') && /*#__PURE__*/React.createElement("div", {
      className: "flex m-4 p-1 rounded-md min-h-0",
      key: story.id
    }, /*#__PURE__*/React.createElement("textarea", {
      cols: 120
      // rows={222}
      // style={{width: "222px",
      // height: "223px"}}
      ,
      name: story.end,
      onChange: function onChange(e) {
        return updateSection(e.target.value, story.id);
      },
      onKeyDown: avoidEnter
      //   onClick={() => setSelectedStory(scrollLock === true ? 0 : story.id)}
      ,
      value: story.end,
      "data-id": story.id
      // className="flex-grow text-justify ml-2 p-2 text-sm"
      //   style={{
      //     fontFamily: selectedFont || 'sans-serif',
      //     fontSize: `${fontSize}rem`,
      //     lineHeight: (fontSize > 1.3) ? 1.5 : '',
      //   }}
    })));
  }));
};

export default EditorPanel;
EditorPanel.propTypes = {
  obsStory: PropTypes.array,
  storyUpdate: PropTypes.func
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9wVHlwZXMiLCJSZWFjdCIsIkVkaXRvclBhbmVsIiwiX3JlZiIsIl9yZWYkb2JzU3RvcnkiLCJvYnNTdG9yeSIsInVwZGF0ZVNlY3Rpb24iLCJhdm9pZEVudGVyIiwiZSIsImtleSIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsImNyZWF0ZUVsZW1lbnQiLCJGcmFnbWVudCIsIm1hcCIsInN0b3J5IiwiaW5kZXgiLCJpZCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImNsYXNzTmFtZSIsImNvbHMiLCJuYW1lIiwidGl0bGUiLCJvbkNoYW5nZSIsInRhcmdldCIsInZhbHVlIiwib25LZXlEb3duIiwidGV4dCIsImVuZCIsInByb3BUeXBlcyIsImFycmF5Iiwic3RvcnlVcGRhdGUiLCJmdW5jIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRWRpdG9yL0VkaXRvclBhbmVsLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCB7IHVzZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XG4vLyBpbXBvcnQgeyB1c2VUcmFuc2xhdGlvbiB9IGZyb20gJ3JlYWN0LWkxOG5leHQnO1xuLy8gaW1wb3J0IHsgbWRUb0pzb24gfSBmcm9tICcuLi8uLi91dGlscy9tZFRvSnNvbic7XG5cblxuLy8gY29uc29sZS5sb2coXCJzc3Nzc3Nzc3Nzc3NzXCIsIClcblxuY29uc3QgRWRpdG9yUGFuZWwgPSAoeyBcbiAgb2JzU3RvcnkgPSBbXSxcbiAgdXBkYXRlU2VjdGlvbixcbiB9KSA9PiB7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcInNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc1wiLCBvYnNTdG9yeSlcblxuLy8gICAgICAgY29uc3Qge1xuLy8gICAgIHN0YXRlOiB7XG4vLyAgICAgICBzZWxlY3RlZEZvbnQsXG4vLyAgICAgICBmb250U2l6ZSxcbi8vICAgICB9LFxuLy8gICAgIGFjdGlvbnM6IHtcbi8vICAgICAgIHNldFNlbGVjdGVkU3RvcnksXG4vLyAgICAgfSxcbi8vIH0gPSB1c2VDb250ZXh0KFJlZmVyZW5jZUNvbnRleHQpO1xuXG5cblxuLy8gICBjb25zdCB7IHN0YXRlczogeyBzY3JvbGxMb2NrIH0gfSA9IHVzZUNvbnRleHQoUHJvamVjdENvbnRleHQpO1xuXG4vLyAgIGNvbnN0IHsgdCB9ID0gdXNlVHJhbnNsYXRpb24oKTtcblxuICAvLyBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSkgPT4ge1xuICAvLyAgIGNvbnN0IGluZGV4ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gIC8vICAgY29uc3QgdmFsdWUgPSAoZS50YXJnZXQudmFsdWUpLnRvU3RyaW5nKCkucmVwbGFjZSgvW1xcblxccl0vZ20sICcnKTtcbiAgLy8gICBjb25zdCBzdG9yeSA9IG9ic1N0b3J5W2luZGV4IC0gMV07XG4gIC8vICAgbGV0IG5ld1N0b3J5ID0ge307XG4gIC8vICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdG9yeSwgJ3RpdGxlJykpIHtcbiAgLy8gICAgIG5ld1N0b3J5ID0ge1xuICAvLyAgICAgICBpZDogc3RvcnkuaWQsXG4gIC8vICAgICAgIHRpdGxlOiB2YWx1ZSxcbiAgLy8gICAgIH07XG4gIC8vICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RvcnksICd0ZXh0JykpIHtcbiAgLy8gICAgIG5ld1N0b3J5ID0ge1xuICAvLyAgICAgICBpZDogc3RvcnkuaWQsXG4gIC8vICAgICAgIGltZzogc3RvcnkuaW1nLFxuICAvLyAgICAgICB0ZXh0OiB2YWx1ZSxcbiAgLy8gICAgIH07XG4gIC8vICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RvcnksICdlbmQnKSkge1xuICAvLyAgICAgbmV3U3RvcnkgPSB7XG4gIC8vICAgICAgIGlkOiBzdG9yeS5pZCxcbiAgLy8gICAgICAgZW5kOiB2YWx1ZSxcbiAgLy8gICAgIH07XG4gIC8vICAgfVxuXG4gIC8vICAgY29uc3QgbmV3U3RvcmllcyA9IG9ic1N0b3J5Lm1hcCgoc3RvcnkpID0+IChzdG9yeS5pZCAhPT0gbmV3U3RvcnkuaWQgPyBzdG9yeSA6IG5ld1N0b3J5KSk7XG4gIC8vICAgbGV0IG5ld0RhdGEgPSB7IC4uLm9ic1N0b3J5IH07XG4gIC8vICAgbmV3RGF0YSA9IG5ld1N0b3JpZXM7XG4gIC8vICAgc3RvcnlVcGRhdGUobmV3RGF0YSk7XG4gIC8vIH07XG4gIGNvbnN0IGF2b2lkRW50ZXIgPSAoZSkgPT4ge1xuICAgIC8vIGF2b2lkaW5nIGVudGVyIGtleSBmb3IgdGhlIEhlYWRlclxuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyB8fCBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7b2JzU3RvcnkubWFwKChzdG9yeSwgaW5kZXgpID0+IChcbiAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17c3RvcnkuaWR9PlxuICAgICAgICAgIHtPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RvcnksICd0aXRsZScpXG4gICAgICAgICAgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggbS00IHAtMSByb3VuZGVkLW1kIG1pbi1oLTBcIlxuICAgICAgICAgICAga2V5PXtzdG9yeS5pZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgIGNvbHM9ezEyMH1cbiAgICAgICAgICAgICAgbmFtZT17c3RvcnkudGl0bGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHVwZGF0ZVNlY3Rpb24oZS50YXJnZXQudmFsdWUsIHN0b3J5LmlkKX1cbiAgICAgICAgICAgICAgb25LZXlEb3duPXthdm9pZEVudGVyfVxuICAgICAgICAgICAgLy8gICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFN0b3J5KHNjcm9sbExvY2sgPT09IHRydWUgPyAwIDogc3RvcnkuaWQpfVxuICAgICAgICAgICAgICB2YWx1ZT17c3RvcnkudGl0bGV9XG4gICAgICAgICAgICAgIGRhdGEtaWQ9e3N0b3J5LmlkfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LWdyb3cgdGV4dC1qdXN0aWZ5IG1sLTIgcC0yIHRleHQteGxcIlxuICAgICAgICAgICAgLy8gICBzdHlsZT17e1xuICAgICAgICAgICAgLy8gICAgIGZvbnRGYW1pbHk6IHNlbGVjdGVkRm9udCB8fCAnc2Fucy1zZXJpZicsXG4gICAgICAgICAgICAvLyAgICAgZm9udFNpemU6IGAke2ZvbnRTaXplfXJlbWAsXG4gICAgICAgICAgICAvLyAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAge09iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdG9yeSwgJ3RleHQnKVxuICAgICAgICAgICYmIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IG0tNCBwLTEgcm91bmRlZC1tZFwiXG4gICAgICAgICAgICBrZXk9e3N0b3J5LmlkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctNSBoLTUgYmctZ3JheS04MDAgcm91bmRlZC1mdWxsIGZsZXgganVzdGlmeS1jZW50ZXIgdGV4dC1zbSB0ZXh0LXdoaXRlIGl0ZW1zLWNlbnRlciBwLTMgXCI+XG4gICAgICAgICAgICAgIHsvKiB7aW5kZXh9ICovfVxuICAgICAgICAgICAgICB7Lyoge2luZGV4LnRvU3RyaW5nKCkuc3BsaXQoJycpLm1hcCgobnVtKSA9PiB0KGBuLSR7bnVtfWApKX0gKi99XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgIGNvbHM9ezEyMH1cbiAgICAgICAgICAgICAgbmFtZT17c3RvcnkudGV4dH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdXBkYXRlU2VjdGlvbihlLnRhcmdldC52YWx1ZSwgc3RvcnkuaWQpfVxuICAgICAgICAgICAgICBvbktleURvd249e2F2b2lkRW50ZXJ9XG4gICAgICAgICAgICAvLyAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkU3Rvcnkoc2Nyb2xsTG9jayA9PT0gdHJ1ZSA/IDAgOiBzdG9yeS5pZCl9XG4gICAgICAgICAgICAgIHZhbHVlPXtzdG9yeS50ZXh0fVxuICAgICAgICAgICAgICBkYXRhLWlkPXtzdG9yeS5pZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC1ncm93IHRleHQtanVzdGlmeSBtbC0yIHAtMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgIC8vICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC8vICAgICBmb250RmFtaWx5OiBzZWxlY3RlZEZvbnQgfHwgJ3NhbnMtc2VyaWYnLFxuICAgICAgICAgICAgLy8gICAgIGZvbnRTaXplOiBgJHtmb250U2l6ZX1yZW1gLFxuICAgICAgICAgICAgLy8gICAgIGxpbmVIZWlnaHQ6IChmb250U2l6ZSA+IDEuMykgPyAxLjUgOiAnJyxcbiAgICAgICAgICAgIC8vICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0b3J5LCAnZW5kJylcbiAgICAgICAgICAmJiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBtLTQgcC0xIHJvdW5kZWQtbWQgbWluLWgtMFwiXG4gICAgICAgICAgICBrZXk9e3N0b3J5LmlkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgY29scz17MTIwfVxuICAgICAgICAgICAgLy8gcm93cz17MjIyfVxuICAgICAgICAgICAgICAvLyBzdHlsZT17e3dpZHRoOiBcIjIyMnB4XCIsXG4gICAgICAgICAgICAgICAgLy8gaGVpZ2h0OiBcIjIyM3B4XCJ9fVxuICAgICAgICAgICAgICBuYW1lPXtzdG9yeS5lbmR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHVwZGF0ZVNlY3Rpb24oZS50YXJnZXQudmFsdWUsIHN0b3J5LmlkKX1cbiAgICAgICAgICAgICAgb25LZXlEb3duPXthdm9pZEVudGVyfVxuICAgICAgICAgICAgLy8gICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFN0b3J5KHNjcm9sbExvY2sgPT09IHRydWUgPyAwIDogc3RvcnkuaWQpfVxuICAgICAgICAgICAgICB2YWx1ZT17c3RvcnkuZW5kfVxuICAgICAgICAgICAgICBkYXRhLWlkPXtzdG9yeS5pZH1cbiAgICAgICAgICAgICAgLy8gY2xhc3NOYW1lPVwiZmxleC1ncm93IHRleHQtanVzdGlmeSBtbC0yIHAtMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgIC8vICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC8vICAgICBmb250RmFtaWx5OiBzZWxlY3RlZEZvbnQgfHwgJ3NhbnMtc2VyaWYnLFxuICAgICAgICAgICAgLy8gICAgIGZvbnRTaXplOiBgJHtmb250U2l6ZX1yZW1gLFxuICAgICAgICAgICAgLy8gICAgIGxpbmVIZWlnaHQ6IChmb250U2l6ZSA+IDEuMykgPyAxLjUgOiAnJyxcbiAgICAgICAgICAgIC8vICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICkpfVxuICAgIDwvPlxuICApO1xufTtcbmV4cG9ydCBkZWZhdWx0IEVkaXRvclBhbmVsO1xuRWRpdG9yUGFuZWwucHJvcFR5cGVzID0ge1xuICBvYnNTdG9yeTogUHJvcFR5cGVzLmFycmF5LFxuICBzdG9yeVVwZGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuIl0sIm1hcHBpbmdzIjoiO0FBQUEsT0FBT0EsU0FBUyxNQUFNLFlBQVk7QUFDbEMsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFDekI7QUFDQTtBQUNBOztBQUdBOztBQUVBLElBQU1DLFdBQVcsR0FBRyxTQUFkQSxXQUFXQSxDQUFBQyxJQUFBLEVBR1Y7RUFBQSxJQUFBQyxhQUFBLEdBQUFELElBQUEsQ0FGTEUsUUFBUTtJQUFSQSxRQUFRLEdBQUFELGFBQUEsY0FBRyxFQUFFLEdBQUFBLGFBQUE7SUFDYkUsYUFBYSxHQUFBSCxJQUFBLENBQWJHLGFBQWE7RUFHWDs7RUFFSjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBSUE7O0VBRUE7O0VBRUU7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFVQSxDQUFJQyxDQUFDLEVBQUs7SUFDeEI7SUFDQSxJQUFJQSxDQUFDLENBQUNDLEdBQUcsS0FBSyxPQUFPLElBQUlELENBQUMsQ0FBQ0UsT0FBTyxLQUFLLEVBQUUsRUFBRTtNQUN6Q0YsQ0FBQyxDQUFDRyxjQUFjLENBQUMsQ0FBQztNQUNsQixPQUFPLEtBQUs7SUFDZDtFQUNGLENBQUM7RUFDRCxvQkFDRVYsS0FBQSxDQUFBVyxhQUFBLENBQUFYLEtBQUEsQ0FBQVksUUFBQSxRQUNHUixRQUFRLENBQUNTLEdBQUcsQ0FBQyxVQUFDQyxLQUFLLEVBQUVDLEtBQUs7SUFBQSxvQkFDekJmLEtBQUEsQ0FBQVcsYUFBQSxDQUFDWCxLQUFLLENB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