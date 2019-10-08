import React from 'react'
import { toast } from 'react-toastify';

class ListErrors extends React.Component {

  notify = () => {
    toast("Default Notification !");

    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER
    });

    toast.error("Error Notification !", {
      position: toast.POSITION.TOP_LEFT
    });

    toast.warn("Warning Notification !", {
      position: toast.POSITION.BOTTOM_LEFT
    });

    toast.info("Info Notification !", {
      position: toast.POSITION.BOTTOM_CENTER
    });

    toast("Custom Style Notification with css class!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'foo-bar'
    });
  };

  render() {
    const errors = this.props.errors
    if (errors) {
      return (
        <ul className="error-messages">

          <button onClick={this.notify}>Notify</button>;
          
          {
            Object.keys(errors).map(key => {
              return (
                <li key={key}>
                  {key} {errors[key]}
                </li>
              )
            })
          }
        </ul>
      )
    } else {
      return null
    }
  }
}

export default ListErrors
