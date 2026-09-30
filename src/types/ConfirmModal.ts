export interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  icon?: string;
  iconColor?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
  onConfirm: () => void;
  onDismiss: () => void;
}
