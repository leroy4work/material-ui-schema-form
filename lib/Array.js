'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _Number = require('./Number');

var _Number2 = _interopRequireDefault(_Number);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _TextArea = require('./TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Radios = require('./Radios');

var _Radios2 = _interopRequireDefault(_Radios);

var _Date = require('./Date');

var _Date2 = _interopRequireDefault(_Date);

var _Switch = require('./Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _Help = require('./Help');

var _Help2 = _interopRequireDefault(_Help);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _SchemaForm = require('./SchemaForm');

var _SchemaForm2 = _interopRequireDefault(_SchemaForm);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormArray = function (_Component) {
  _inherits(FormArray, _Component);

  function FormArray(props) {
    _classCallCheck(this, FormArray);

    var _this = _possibleConstructorReturn(this, (FormArray.__proto__ || Object.getPrototypeOf(FormArray)).call(this, props));

    _this.state = {
      model: _utils2.default.selectOrSet(_this.props.form.key, _this.props.model) || []
    };

    _this.onAppend = function () {
      return _this.__onAppend__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onDelete = function () {
      return _this.__onDelete__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    return _this;
  }

  _createClass(FormArray, [{
    key: '__onDelete__REACT_HOT_LOADER__',
    value: function __onDelete__REACT_HOT_LOADER__() {
      return this.__onDelete__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onAppend__REACT_HOT_LOADER__',
    value: function __onAppend__REACT_HOT_LOADER__() {
      return this.__onAppend__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.model && nextProps.form && nextProps.form.key) {
        this.setState({
          model: _utils2.default.selectOrSet(nextProps.form.key, nextProps.model) || []
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Always start with one empty form unless configured otherwise.
      if (this.props.form.startEmpty !== true && this.state.model.length === 0) {
        this.onAppend();
      }
    }
  }, {
    key: '__onAppend__REACT_HOT_LOADER__',
    value: function __onAppend__REACT_HOT_LOADER__() {
      //console.log('onAppend is called this.state.model', this.state.model);
      var empty;
      if (this.props.form && this.props.form.schema && this.props.form.schema.items) {
        var items = this.props.form.schema.items;
        if (items.type && items.type.indexOf('object') !== -1) {
          empty = {};

          // Check for possible defaults
          if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
            empty = typeof items['default'] !== 'undefined' ? items['default'] : empty;

            // Check for defaults further down in the schema.
            // If the default instance sets the new array item to something falsy, i.e. null
            // then there is no need to go further down.
            if (empty) {
              _utils2.default.traverseSchema(items, function (prop, path) {
                if (typeof prop['default'] !== 'undefined') {
                  _utils2.default.selectOrSet(path, empty, prop['default']);
                }
              });
            }
          }
        } else if (items.type && items.type.indexOf('array') !== -1) {
          empty = [];
          if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
            empty = items['default'] || empty;
          }
        } else {
          // No type? could still have defaults.
          if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
            empty = items['default'] || empty;
          }
        }
      }
      var newModel = this.state.model;
      newModel.push(empty);
      this.setState({
        model: newModel
      });
      this.props.onChangeValidate(this.state.model);
      //console.log('After append this.state.model', newModel);
    }
  }, {
    key: '__onDelete__REACT_HOT_LOADER__',
    value: function __onDelete__REACT_HOT_LOADER__(index) {
      //console.log('onDelete is called', index);
      var newModel = this.state.model;
      newModel.splice(index, 1);
      this.setState({
        model: newModel
      });
      this.props.onChangeValidate(this.state.model);
    }
  }, {
    key: 'setIndex',
    value: function setIndex(index) {
      return function (form) {
        if (form.key) {
          form.key[form.key.indexOf('')] = index;
        }
      };
    }
  }, {
    key: 'copyWithIndex',
    value: function copyWithIndex(form, index) {
      var copy = _lodash2.default.cloneDeep(form);
      copy.arrayIndex = index;
      _utils2.default.traverseForm(copy, this.setIndex(index));
      return copy;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      //console.log('FormArray.render', this.props.form.items, this.props.model, this.state.model);
      var arrays = [];
      var fields = [];
      var model = this.state.model;
      var _props = this.props,
          form = _props.form,
          builder = _props.builder,
          onChange = _props.onChange,
          mapper = _props.mapper;
      //console.log('fields', fields);

      var _loop = function _loop(i) {
        var boundOnDelete = _this2.onDelete.bind(_this2, i);
        var forms = form.items.map(function (form, index) {
          var copy = this.copyWithIndex(form, i);
          return builder(copy, this.props.model, index, onChange, mapper, builder);
        }.bind(_this2));
        //console.log('forms', i, forms);
        arrays.push(_react2.default.createElement(
          'li',
          { key: i, className: 'list-group-item' },
          _react2.default.createElement(
            'div',
            { style: { display: 'flex' } },
            forms,
            _react2.default.createElement(
              _IconButton2.default,
              { onClick: boundOnDelete },
              'clear'
            )
          )
        ));
      };

      for (var i = 0; i < model.length; i++) {
        _loop(i);
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            { className: 'control-lable' },
            form.title
          ),
          _react2.default.createElement(
            'ol',
            { className: 'list-group' },
            arrays
          )
        ),
        _react2.default.createElement(
          _Button2.default,
          { raised: true, onClick: this.onAppend, color: 'primary' },
          form.add || 'Add'
        )
      );
    }
  }]);

  return FormArray;
}(_react.Component);

var _default = (0, _ComposedComponent2.default)(FormArray);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FormArray, 'FormArray', 'src/Array.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Array.js');
}();

;