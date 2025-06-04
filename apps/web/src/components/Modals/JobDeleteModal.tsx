'use client';
import { Modal, Button } from 'react-bootstrap';

export default function JobDeleteModal({ show, onClose, onConfirm, jobTitle }: any) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Supprimer l'offre</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Êtes-vous sûr de vouloir supprimer <strong>{jobTitle}</strong> ?</p>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={onClose}>Annuler</Button>
          <Button variant="danger" onClick={onConfirm}>Supprimer</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
