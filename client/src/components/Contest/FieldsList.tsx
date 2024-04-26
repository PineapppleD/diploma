import { ContestTypes, Categories } from "../../models";
import FormField from "../Fields";

export default function FieldsList() {
  return (
    <>
      <FormField label="Category" type="select" id="category" name="category">
        {
            Object.values(Categories).map((item: Categories) => {
                return (
                    <option key={item} value={item}>{item}</option>
                )
            })
        }
      </FormField>
      <FormField label="Contest Type" type="select" id="contestType" name="contestType">
        {
            Object.values(ContestTypes).map((type: ContestTypes) => {
                return (
                    <option key={type} value={type}>{type}</option>
                )
            })
        }
      </FormField>
      <FormField label="Name" type="text" id="name" name="name" />
      <FormField
        label="Description"
        type="text"
        id="description"
        name="description"
      />
      <FormField label="Start Date" type="date" id="start" name="start" />
      <FormField label="End Date" type="date" id="end" name="end" />
      <FormField
        label="Max Participants"
        type="number"
        id="max_participants"
        name="max_participants"
      />
    </>
  );
}
