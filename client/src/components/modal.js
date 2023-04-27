import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/modal.scss';

const Modal = ({ title, onClose, content }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header d-flex-align-center d-flex-justify-between d-flex-justify-between ">
          <div></div>
          <h1 className="modal-title">{title}</h1>
          <button className="modal-close-container" onClick={onClose}>
            <span className="modal-close">&times;</span>
          </button>
        </div>
        <div className="modal-content">{content}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.element.isRequired,
};

export default Modal;
