import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class ContentHeader extends Component {
    render() {
        return (
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="text-bold text-gray">{this.props.title}</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <Link to="/admin">Home</Link>
                      </li>
                      <li className="breadcrumb-item active">
                        {this.props.title}
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              {/* /.container-fluid */}
            </section>
        );
    }
}
