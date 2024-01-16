export interface IAreaManagementData {
  areaId: number;
  areaName: string;
  areaAddress: string;
  person: string;
}

export interface IAddAreaModalProps {
  handleAddInput: () => void;
  handleRemoveInput: (value: number) => void;
  inputFields: { id: number }[];
}
