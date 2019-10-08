import React, { Component } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

class Example extends Component {
  upload = () => {
    // we need to keep a reference of the toastId to be able to update it
    let toastId = null;

    axios.request({
      method: "post",
      url: "/foobar",
      data: myData,
      
      onUploadProgress: p => {
        const progress = p.loaded / p.total;

        // check if we already displayed a toast
        if (toastId === null) {
          toastId = toast('Upload in Progress', {
            progress: progress
          });
        } else {
          toast.update(toastId, {
            progress: progress
          })
        }
      }
    }).then(data => {
      // Upload is done! 
      // The remaining progress bar will be filled up
      // The toast will be closed when the transition end
      toast.done(toast.id)
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.upload}>Upload something</button>
      </div>
    );
  }
}