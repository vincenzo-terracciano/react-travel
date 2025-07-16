import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext"


export default function PackingItems() {

    const { selectedTravel } = useGlobalContext();

    // ordino gli oggetti obbligatori visualizzandoli per primi
    const items = [...(selectedTravel?.packing_items || [])].sort((a, b) => b.is_mandatory - a.is_mandatory);

    if (!items.length) {
        return (
            <div className="container py-5">
                <h4>Nessun oggetto da portare in valigia è stato aggiunto per questo viaggio.</h4>
                <Link to=".." className="custom-btn mt-3"><i className="fas fa-arrow-left me-1"></i> Torna indietro</Link>
            </div>
        )
    }

    return (
        <>
            <div className="container py-5">
                <h2 className="mb-4 fw-bold">Cosa portare in valigia</h2>

                <ul className="list-group shadow-sm packing-list">
                    {items.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center packing-item">
                            <label className="d-flex align-items-center mb-0 w-100">
                                <input type="checkbox" className="form-check-input me-3" />
                                <span className="item flex-grow-1">{item.item_name}</span>
                                {item.is_mandatory ? (
                                    <span className="badge bg-danger">Obbligatorio</span>
                                ) : ('')
                                }
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}