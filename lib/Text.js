'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormText = function (_Component) {
  _inherits(FormText, _Component);

  function FormText() {
    _classCallCheck(this, FormText);

    return _possibleConstructorReturn(this, (FormText.__proto__ || Object.getPrototypeOf(FormText)).apply(this, arguments));
  }

  _createClass(FormText, [{
    key: 'render',
    value: function render() {
      //console.log('Text props', this.props.form.readonly);
      return _react2.default.createElement(
        'div',
        { className: this.props.form.htmlClass },
        _react2.default.createElement(_TextField2.default, {
          type: this.props.form.type,
          label: this.props.form.title,
          placeholder: this.props.form.placeholder,
          helperText: this.props.error,
          error: this.props.error ? true : false,
          onChange: this.props.onChangeValidate,
          defaultValue: this.props.value,
          disabled: this.props.form.readonly,
          style: this.props.form.style || { width: '100%' }
        })
      );
    }
  }]);

  return FormText;
}(_react.Component);

var _default = (0, _ComposedComponent2.default)(FormText);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FormText, 'FormText', 'src/Text.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Text.js');
}();

;