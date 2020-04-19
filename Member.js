import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Navbar from "../component/Navbar"
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Member extends Component {
  constructor() {
    super();
    this.state = {
      member: [],
      id: "",
      username: "",
      email: "",
      password: "",
      role: "",
      first_name: "",
      last_name: "",
      gender: "",
      date_birth: "",
      no_hp: "",
      alamat: "",
      image: null,
      action: "",
      find: "",
      message: ""
    };

    // if token doesn't exist in local storage
 //   if (!localStorage.getItem("Token")) {
      // directs to login page
      //  window.location = "/";
//    }
  }

  bind = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  bindImage = (e) => {
    this.setState({image: e.target.files[0]})
  }
  

  Add = () => {
    // shows modal
    $("#modal_member").modal("show");
    // empties form data
    this.setState({
      action: "insert",
      id: "",
      username: "",
      email: "",
      password: "",
      role: "",
      first_name: "",
      last_name: "",
      gender: "",
      date_birth: "",
      no_hp: "",
      alamat: ""
    });
  };

  Edit = (item) => {
    // shows modal
    $("#modal_member").modal("show");
    // empties form data
    this.setState({
      action: "update",
      id: item.id,
      username: item.username,
      email: item.email,
      password: item.password,
      role: item.role,
      first_name: item.first_name,
      last_name: item.last_name,
      gender: item.gender,
      date_birth: item.date_birth,
      no_hp: item.no_hp,
      alamat: item.alamat
    });
  };

  getMember = () => {
    $("#loading").toast("show");
    let url = "http://localhost:8080/lapangan/public/member";
    axios
      .get(url)
      .then(response => {
        this.setState({ member: response.data.member });
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
  };

  Drop = id => {
    if (window.confirm("Are you sure you want to drop this data?")) {
      $("#loading").toast("show");
      let url = "http://localhost:8080/lapangan/public/member/drop/" + id;
      axios
        .delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ message: response.data.message });
          $("#message").toast("show");
          this.getMember();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  componentDidMount = () => {
  this.getMember();
  };

  Save = event => {
    event.preventDefault();
    // shows loading process
    $("#modal_member").modal("hide");
    let url = "http://localhost:8080/lapangan/public/member/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id", this.state.id);
    form.append("username", this.state.username);
    form.append("email", this.state.email);
    form.append("password", this.state.password);
    form.append("role", this.state.role);
    form.append("first_name", this.state.first_name);
    form.append("last_name", this.state.last_name);
    form.append("gender", this.state.gender);
    form.append("no_hp", this.state.no_hp);
    form.append("alamat", this.state.alamat);

    axios
      .post(url, form)
      .then(response => {
      //  $("#loading").toast("hide");
      //  this.setState({ message: response.data.message });
      //  $("#message").toast("show");
        this.getMember();
      })
      .catch(error => {
        console.log(error);
      });
  };


  search = (event) => {
    if (event.keyCode === 13) {
      $("#loading").toast("show");
      let url = "http://localhost:8080/lapangan/public/member/find";
      let form = new FormData();
      form.append("find", this.state.find);
      axios
        .post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ member: response.data.member });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="card mt-2">
          {/* card header */}
          <div className="card-header bg-info">
            <div className="row">
              <div className="col-sm-8">
                <h4 className="text-white">Data Member</h4>
              </div>

              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="find"
                  onChange={this.bind}
                  value={this.state.find}
                  onKeyUp={this.search}
                  placeholder="Pencarian..."
                />
              </div>
            </div>
          </div>
          {/* card content */}
          <div className="card-body">
            <Toast id="message" autohide="true" title="Informasi">
              {this.state.message}
            </Toast>
            <Toast id="loading" autohide="false" title="Informasi">
              <span className="fa fa-spin fa-spinner"></span> Loading
            </Toast>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Date Birth</th>
                  <th>No HP</th>
                  <th>Alamat</th>
                  <th>Opsi</th>
                </tr>
              </thead>
              <tbody>
                {this.state.member.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>
                      <td>{item.role}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.gender}</td>
                      <td>{item.date_birth}</td>
                      <td>{item.no_hp}</td>
                      <td>{item.alamat}</td>
                      <td><button
                          className="m-1 btn btn-sm btn-info"
                          onClick={() => this.Edit(item)}
                        >
                          <span className="fa fa-edit"></span>
                        </button>
                        <button
                          className="m-1 btn btn-sm btn-danger"
                          onClick={() => this.Drop(item.id)}
                        >
                          <span className="fa fa-trash"></span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* add button */}
            <button className="btn btn-success my-2" onClick={this.Add}>
              <span className="fa fa-plus"></span> Tambah Data
            </button>

            {/* user modal form */}
            <Modal id="modal_member" title="Form Member" bg_header="success" text-header="white">
              <form onSubmit={this.Save}>
                  Nama
                  <input type="text" className="form-control" name="username"
                    value={this.state.username} onChange={this.bind} required />
                  Email
                  <input type="text" className="form-control" name="email"
                    value={this.state.email} onChange={this.bind} required />
                  Password
                  <input type="text" className="form-control" name="password"
                    value={this.state.password} onChange={this.bind} required />
                  First Name
                  <input type="text" className="form-control" name="first_name"
                  value={this.state.first_name} onChange={this.bind} required />
                  Last Name
                  <input type="text" className="form-control" name="last_name"
                  value={this.state.last_name} onChange={this.bind} required />
                  <div className="form-group">
                  <label for="role">Role</label>
                  <select class="form-control" name="role" value={this.state.value} onChange={this.bind} required>
                    <option value="member">member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                  Date Birth
                  <input type="date" className="form-control" name="date_birth"
                  value={this.state.date_birth} onChange={this.bind} required />
                  NO HP
                  <input type="int" className="form-control" name="no_hp"
                  value={this.state.no_hp} onChange={this.bind} />
                  Alamat
                  <input type="text" className="form-control" name="alamat"
                  value={this.state.alamat} onChange={this.bind} />
                
                <button type="submit" className="btn btn-info pull-right m-2">
                     Simpan
                   </button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Member;