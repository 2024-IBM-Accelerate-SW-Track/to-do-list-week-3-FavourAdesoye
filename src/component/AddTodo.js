import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker , LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

class AddTodo extends Component {
  // Create a local react state of the this component with both content date property set to nothing.
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      date: "",
      due: null
    };
  }
  // The handleChange function updates the react state with the new input value provided from the user and the current date/time.
  // "event" is the defined action a user takes. In this case, the event is triggered when the user types something
  // into the text field.
  handleChange = (event) => {
    this.setState({
      content: event.target.value,
      date: Date().toLocaleString('en-US')
    });
  };

  handleDueDateChange = (date) => {
    this.setState({
        due: new Date(date).toLocaleDateString('en-US'),
    });
};


 handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.content.trim() && this.state.due) {
      this.props.addTodo({
        content: this.state.content,
        date: this.state.date,
        due: this.state.due
      });
      this.setState({
        content: '',
        date: '',
        due: null
      });
    }
  };
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <TextField
          name="content"
          label="Add New Item"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.content}
          data-testid="new-item-input"
          
        />
      <LocalizationProvider dateAdapter={AdapterDateFns}>         
<DesktopDatePicker
id="new-item-date"
label="Due Date"
value={this.state.due}
onChange={this.handleDueDateChange}
renderInput={(params) => <TextField {...params} />}
/>
</LocalizationProvider>

        <Button
          style={{ marginLeft: "10px" }}
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
          data-testid="new-item-button"
        >
          Add
        </Button>
        </form>
    );
  }
}

export default AddTodo;
