import React, {Component} from 'react';
import utils from './utils';
import Number from './Number';
import Text from './Text';
import TextArea from './TextArea';
import Select from './Select';
import Radios from './Radios';
import Date from './Date';
import Switch from './Switch';
import Help from './Help';
import ComposedComponent from './ComposedComponent';
import Button from 'material-ui/Button';
import _ from 'lodash';
import SchemaForm from './SchemaForm';
import IconButton from 'material-ui/IconButton';

class FormArray extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    model: utils.selectOrSet(this.props.form.key, this.props.model) || [],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.model && nextProps.form && nextProps.form.key) {
      this.setState({
        model: utils.selectOrSet(nextProps.form.key, nextProps.model) || []
      });
    }
  }

  componentDidMount() {
    // Always start with one empty form unless configured otherwise.
    if (this.props.form.startEmpty !== true && this.state.model.length === 0) {
      this.onAppend();
    }
  }

  onAppend = () => {
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
            utils.traverseSchema(items, function(prop, path) {
              if (typeof prop['default'] !== 'undefined') {
                utils.selectOrSet(path, empty, prop['default']);
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
    const newModel = this.state.model;
    newModel.push(empty);
    this.setState({
      model: newModel,
    });
    this.props.onChangeValidate(this.state.model);
    //console.log('After append this.state.model', newModel);
  };

  onDelete = (index) => {
    //console.log('onDelete is called', index);
    const newModel = this.state.model;
    newModel.splice(index, 1);
    this.setState({
      model: newModel,
    });
    this.props.onChangeValidate(this.state.model);
  };

  setIndex(index) {
    return function(form) {
      if (form.key) {
        form.key[form.key.indexOf('')] = index;
      }
    };
  };

  copyWithIndex(form, index) {
    const copy = _.cloneDeep(form);
    copy.arrayIndex = index;
    utils.traverseForm(copy, this.setIndex(index));
    return copy;
  };

  render() {
    //console.log('FormArray.render', this.props.form.items, this.props.model, this.state.model);
    const arrays = [];
    const fields = [];
    const {model} = this.state;
    const {
      form,
      builder,
      onChange,
      mapper,
    } = this.props;
    //console.log('fields', fields);
    for(let i = 0; i < model.length; i++ ) {
      let boundOnDelete = this.onDelete.bind(this, i);
      let forms = form.items.map(function(form, index){
        const copy = this.copyWithIndex(form, i);
        return builder(copy, this.props.model, index, onChange, mapper, builder);
      }.bind(this));
      //console.log('forms', i, forms);
      arrays.push(
        <li key={i} className="list-group-item">
          <div style={{display: 'flex'}}>
            {forms}
            <IconButton onClick={boundOnDelete}>clear</IconButton>
          </div>
        </li>
      );
    }
    return (
      <div>
        <div>
          <label className="control-lable">{form.title}</label>
          <ol className="list-group">
            {arrays}
          </ol>
        </div>
        <Button raised onClick={this.onAppend} color="primary">{form.add || 'Add'}</Button>
      </div>
    );
  }
}

export default ComposedComponent(FormArray);
