import { Modal, Text } from "@nextui-org/react"

interface ModalContainerProps {
  isOpen: boolean
  closeHandler: () => void
  title: string
  children: React.ReactNode
  fullScreen?: boolean
}

export const ModalContainer = ({ isOpen, closeHandler, title, children, fullScreen = false }: ModalContainerProps) => {
  return (
    <Modal
        closeButton
        aria-labelledby="modal-title"
        open={isOpen}
        onClose={closeHandler}
        fullScreen
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {title}
          </Text>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
  )
}