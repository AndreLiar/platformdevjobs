export default function PostJobPage() {
    return (
      <div className="container py-6">
        <h2 className="text-xl font-bold mb-4">Créer une nouvelle offre</h2>
        <form>
          <input type="text" placeholder="Titre du poste" className="form-control mb-3" />
          <textarea placeholder="Description..." className="form-control mb-3" />
          <button type="submit" className="btn btn-success">Publier</button>
        </form>
      </div>
    );
  }
  