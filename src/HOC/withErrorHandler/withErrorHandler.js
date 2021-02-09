import React, { Component } from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Auxiliaire from "../Auxiliaire/Auxiliaire";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      this.reqIntercepotors = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resIntercepotors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqIntercepotors);
      axios.interceptors.response.eject(this.resIntercepotors);
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Auxiliaire>
          <Modal show={this.state.error} clicked={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliaire>
      );
    }
  };
};

export default withErrorHandler;
