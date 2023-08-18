function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.date.to-string.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.is-array.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.symbol.to-primitive.js";
import "core-js/modules/es.date.to-primitive.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.array.for-each.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.get-own-property-descriptors.js";
import "core-js/modules/es.object.define-properties.js";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { useState } from "react";
export var useStory = function useStory() {
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    story = _useState2[0],
    setStory = _useState2[1];
  var updateSection = function updateSection(textValue, sectionId) {
    // const index = e.target.getAttribute('data-id');
    var value = textValue.toString().replace(/[\n\r]/gm, '');
    var section = story[sectionId - 1];
    var newStory = {};
    if (Object.prototype.hasOwnProperty.call(section, 'title')) {
      newStory = {
        id: section.id,
        title: value
      };
    } else if (Object.prototype.hasOwnProperty.call(section, 'text')) {
      newStory = {
        id: section.id,
        img: section.img,
        text: value
      };
    } else if (Object.prototype.hasOwnProperty.call(section, 'end')) {
      newStory = {
        id: section.id,
        end: value
      };
    }
    var newStories = story.map(function (section) {
      return section.id !== newStory.id ? section : newStory;
    });
    var newData = _objectSpread({}, story);
    newData = newStories;
    setStory(newData);
  };
  return {
    state: {
      story: story
    },
    actions: {
      setStory: setStory,
      updateSection: updateSection
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZVN0b3J5IiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwic3RvcnkiLCJzZXRTdG9yeSIsInVwZGF0ZVNlY3Rpb24iLCJ0ZXh0VmFsdWUiLCJzZWN0aW9uSWQiLCJ2YWx1ZSIsInRvU3RyaW5nIiwicmVwbGFjZSIsInNlY3Rpb24iLCJuZXdTdG9yeSIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImlkIiwidGl0bGUiLCJpbWciLCJ0ZXh0IiwiZW5kIiwibmV3U3RvcmllcyIsIm1hcCIsIm5ld0RhdGEiLCJfb2JqZWN0U3ByZWFkIiwic3RhdGUiLCJhY3Rpb25zIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hvb2tzL3VzZVN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCJcblxuZXhwb3J0IGNvbnN0IHVzZVN0b3J5ID0gKCkgPT4ge1xuICBcbiAgICBjb25zdCBbc3RvcnksIHNldFN0b3J5XSA9IHVzZVN0YXRlKFtdKTtcblxuXG4gICAgY29uc3QgdXBkYXRlU2VjdGlvbiA9ICh0ZXh0VmFsdWUsIHNlY3Rpb25JZCkgPT4ge1xuICAgICAgICAvLyBjb25zdCBpbmRleCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9ICh0ZXh0VmFsdWUpLnRvU3RyaW5nKCkucmVwbGFjZSgvW1xcblxccl0vZ20sICcnKTtcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHN0b3J5W3NlY3Rpb25JZCAtIDFdO1xuICAgICAgICBsZXQgbmV3U3RvcnkgPSB7fTtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzZWN0aW9uLCAndGl0bGUnKSkge1xuICAgICAgICAgIG5ld1N0b3J5ID0ge1xuICAgICAgICAgICAgaWQ6IHNlY3Rpb24uaWQsXG4gICAgICAgICAgICB0aXRsZTogdmFsdWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc2VjdGlvbiwgJ3RleHQnKSkge1xuICAgICAgICAgIG5ld1N0b3J5ID0ge1xuICAgICAgICAgICAgaWQ6IHNlY3Rpb24uaWQsXG4gICAgICAgICAgICBpbWc6IHNlY3Rpb24uaW1nLFxuICAgICAgICAgICAgdGV4dDogdmFsdWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc2VjdGlvbiwgJ2VuZCcpKSB7XG4gICAgICAgICAgbmV3U3RvcnkgPSB7XG4gICAgICAgICAgICBpZDogc2VjdGlvbi5pZCxcbiAgICAgICAgICAgIGVuZDogdmFsdWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBuZXdTdG9yaWVzID0gc3RvcnkubWFwKChzZWN0aW9uKSA9PiAoc2VjdGlvbi5pZCAhPT0gbmV3U3RvcnkuaWQgPyBzZWN0aW9uIDogbmV3U3RvcnkpKTtcbiAgICAgICAgbGV0IG5ld0RhdGEgPSB7IC4uLnN0b3J5IH07XG4gICAgICAgIG5ld0RhdGEgPSBuZXdTdG9yaWVzO1xuICAgICAgICBzZXRTdG9yeShuZXdEYXRhKTtcbiAgICAgIH07XG4gICAgXG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdGU6e1xuICAgICAgICAgICAgc3RvcnksXG4gICAgICAgIH0sXG4gICAgICAgIGFjdGlvbnM6e1xuICAgICAgICAgICAgc2V0U3RvcnksXG4gICAgICAgICAgICB1cGRhdGVTZWN0aW9uLFxuICAgICAgICB9LFxuICAgIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsUUFBUSxRQUFRLE9BQU87QUFFaEMsT0FBTyxJQUFNQyxRQUFRLEdBQUcsU0FBWEEsUUFBUUEsQ0FBQSxFQUFTO0VBRTFCLElBQUFDLFNBQUEsR0FBMEJGLFFBQVEsQ0FBQyxFQUFFLENBQUM7SUFBQUcsVUFBQSxHQUFBQyxjQUFBLENBQUFGLFNBQUE7SUFBL0JHLEtBQUssR0FBQUYsVUFBQTtJQUFFRyxRQUFRLEdBQUFILFVBQUE7RUFHdEIsSUFBTUksYUFBYSxHQUFHLFNBQWhCQSxhQUFhQSxDQUFJQyxTQUFTLEVBQUVDLFNBQVMsRUFBSztJQUM1QztJQUNBLElBQU1DLEtBQUssR0FBSUYsU0FBUyxDQUFFRyxRQUFRLENBQUMsQ0FBQyxDQUFDQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztJQUM1RCxJQUFNQyxPQUFPLEdBQUdSLEtBQUssQ0FBQ0ksU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNwQyxJQUFJSyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLElBQUlDLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxjQUFjLENBQUNDLElBQUksQ0FBQ0wsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFO01BQzFEQyxRQUFRLEdBQUc7UUFDVEssRUFBRSxFQUFFTixPQUFPLENBQUNNLEVBQUU7UUFDZEMsS0FBSyxFQUFFVjtNQUNULENBQUM7SUFDSCxDQUFDLE1BQU0sSUFBSUssTUFBTSxDQUFDQyxTQUFTLENBQUNDLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDTCxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUU7TUFDaEVDLFFBQVEsR0FBRztRQUNUSyxFQUFFLEVBQUVOLE9BQU8sQ0FBQ00sRUFBRTtRQUNkRSxHQUFHLEVBQUVSLE9BQU8sQ0FBQ1EsR0FBRztRQUNoQkMsSUFBSSxFQUFFWjtNQUNSLENBQUM7SUFDSCxDQUFDLE1BQU0sSUFBSUssTUFBTSxDQUFDQyxTQUFTLENBQUNDLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDTCxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7TUFDL0RDLFFBQVEsR0FBRztRQUNUSyxFQUFFLEVBQUVOLE9BQU8sQ0FBQ00sRUFBRTtRQUNkSSxHQUFHLEVBQUViO01BQ1AsQ0FBQztJQUNIO0lBRUEsSUFBTWMsVUFBVSxHQUFHbkIsS0FBSyxDQUFDb0IsR0FBRyxDQUFDLFVBQUNaLE9BQU87TUFBQSxPQUFNQSxPQUFPLENBQUNNLEVBQUUsS0FBS0wsUUFBUSxDQUFDSyxFQUFFLEdBQUdOLE9BQU8sR0FBR0MsUUFBUTtJQUFBLENBQUMsQ0FBQztJQUM1RixJQUFJWSxPQUFPLEdBQUFDLGFBQUEsS0FBUXRCLEtBQUssQ0FBRTtJQUMxQnFCLE9BQU8sR0FBR0YsVUFBVTtJQUNwQmxCLFFBQVEsQ0FBQ29CLE9BQU8sQ0FBQztFQUNuQixDQUFDO0VBR0gsT0FBTztJQUNIRSxLQUFLLEVBQUM7TUFDRnZCLEtBQUssRUFBTEE7SUFDSixDQUFDO0lBQ0R3QixPQUFPLEVBQUM7TUFDSnZCLFFBQVEsRUFBUkEsUUFBUTtNQUNSQyxhQUFhLEVBQWJBO0lBQ0o7RUFDSixDQUFDO0FBQ0wsQ0FBQyJ9