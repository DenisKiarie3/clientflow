import Modal from './Modal'

function ConfirmDialog({ isOpen, onClose, onConfirm, title, description, confirmLabel = 'Confirm', isDangerous = false }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-sm text-slate mb-6">{description}</p>
      <div className="flex gap-3 justify-end">
        <button type="button" onClick={onClose} className="border border-black/10 text-ink text-sm font-medium px-4 py-2 rounded-lg hover:bg-black/5">
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`text-white text-sm font-medium px-4 py-2 rounded-lg ${isDangerous ? 'bg-coral hover:bg-coral/90' : 'bg-violet hover:bg-violet/90'}`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog