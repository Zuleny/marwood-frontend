import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
          <footer className="main-footer">
            {/* To the right */}
            <div className="float-right d-none d-sm-inline">
              Contact
            </div>
            {/* Default to the left */}
            <strong>
              Copyright © 2020{" "}
              <a href="/">MarWood</a>.
            </strong>{" "}
            All rights reserved.
          </footer>
        );
    }
}
