'use client';
import { useForm } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap';

export default function JobEditModal({ show, onClose, onSave, initialData }: any) {
  const { register, handleSubmit } = useForm({ defaultValues: initialData });

  const onSubmit = (data: any) => {
    onSave(data);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifier l'offre</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Titre</label>
            <input className="form-control" {...register('title')} />
          </div>
          <div className="mb-3">
            <label className="form-label">Plateforme</label>
            <input className="form-control" {...register('platform')} />
          </div>
          <Button type="submit" className="btn btn-dark">Enregistrer</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
