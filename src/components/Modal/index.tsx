import React from "react";
import { Modal } from "antd";

interface ModalProps {
  title: string;
  open: boolean;
  width: number;
  content: React.ReactNode;
  onOpenHandler: (open: boolean) => void;
}

const CustomModal = (props: ModalProps) => {
  const { content, open, width, title, onOpenHandler } = props;

  return (
    <>
      {/* <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal of 1000px width
      </Button> */}
      <Modal
        title={title}
        centered
        open={open}
        onOk={() => onOpenHandler(false)}
        onCancel={() => onOpenHandler(false)}
        width={width}
        footer={null}
      >
        {content}
      </Modal>
    </>
  );
};

export default CustomModal;
