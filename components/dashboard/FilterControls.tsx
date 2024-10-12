type FilterControlsProps = {
    searchTerm: string
    setSearchTerm: (value: string) => void
    filterStatus: string | null
    setFilterStatus: (value: string | null) => void
}

export function FilterControls({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }: FilterControlsProps) {
    return (
        <div className="flex space-x-4">
            <input
                type="text"
                placeholder="Rechercher par client ou ID de commande"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-gray-500 rounded"
            />
            <select
                value={filterStatus || ""}
                onChange={(e) => setFilterStatus(e.target.value || null)}
                className="p-2 border border-gray-500 rounded"
            >
                <option value="">Tous les statuts</option>
                <option value="en attente">En attente</option>
                <option value="en traitement">En traitement</option>
                <option value="terminé">Terminé</option>
                <option value="annulé">Annulé</option>
            </select>
        </div>
    )
}
