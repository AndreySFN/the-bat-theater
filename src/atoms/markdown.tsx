import React from 'react';
import { Modal, Button } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface IMarkdownModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  okText?: string;
  cancelText?: string;
  markdownContent: string;
}

export const MarkdownModal: React.FC<IMarkdownModalProps> = ({
  isVisible,
  onClose,
  title,
  okText,
  cancelText,
  markdownContent,
}) => {
  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };
  const footerBtns = [
    <Button key="back" onClick={handleCancel}>
      {cancelText}
    </Button>,
  ];
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  cancelText &&
    footerBtns.push(
      <Button key="submit" type="primary" onClick={handleOk}>
        {okText}
      </Button>
    );
  return (
    <Modal
      title={title}
      open={isVisible}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdownContent}
      </ReactMarkdown>
    </Modal>
  );
};
